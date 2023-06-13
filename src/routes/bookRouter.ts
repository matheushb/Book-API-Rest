import express from 'express'
import { BookController } from '../controllers/bookController'
import { BookRepository } from '../repositories/BookRepository'
import { BookService } from '../services/BookService'
import IBookController from '../interfaces/IBookController'
import IBookRepository from '../interfaces/IBookRepository'
import IBookService from '../interfaces/IBookService'
import { AuthController } from '../controllers/authController'
import { IAuthController } from '../interfaces/IAuthController'
import { AliasTopBooks } from '../middlewares/topFiveBooks'

const bookRouter = express.Router()

const authController: IAuthController = new AuthController()
const bookRepository: IBookRepository = new BookRepository()
const bookService: IBookService = new BookService(bookRepository)
const bookController: IBookController = new BookController(bookService)

bookRouter.route('/books/top-five-books').get(AliasTopBooks, bookController.getAllBooks)

bookRouter
  .route('/books')
  .get(authController.protectRoute, authController.restrictedTo('admin'), bookController.getAllBooks)
  .post(authController.protectRoute, authController.restrictedTo('admin', 'recruiter'), bookController.createBook)

bookRouter
  .route('/books/:id')
  .get(authController.protectRoute, authController.restrictedTo('admin'), bookController.getBookById)
  .delete(authController.protectRoute, authController.restrictedTo('admin'), bookController.deleteBookById)
  .patch(authController.protectRoute, authController.restrictedTo('admin', 'recruiter'), bookController.updateBookById)

export default bookRouter
