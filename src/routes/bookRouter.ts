import express from 'express'
import { BookController } from '../controllers/bookController'
import { BookRepository } from '../repositories/BookRepository'
import { BookService } from '../services/BookService'
import IBookController from '../interfaces/IBookController'
import IBookRepository from '../interfaces/IBookRepository'
import IBookService from '../interfaces/IBookService'
import { AuthController } from '../controllers/authController'
import { IAuthController } from '../interfaces/IAuthController'

const bookRouter = express.Router()

const authController: IAuthController = new AuthController()
const bookRepository: IBookRepository = new BookRepository()
const bookService: IBookService = new BookService(bookRepository)
const bookController: IBookController = new BookController(bookService)

bookRouter
  .route('/books')
  .get(authController.protectRoute, bookController.getAllBooks)
  .post(authController.protectRoute, bookController.createBook)

bookRouter
  .route('/books/:id')
  .get(authController.protectRoute, bookController.getBookById)
  .delete(authController.protectRoute, bookController.deleteBookById)
  .patch(authController.protectRoute, bookController.updateBookById)

export default bookRouter
