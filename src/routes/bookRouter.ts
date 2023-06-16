import { Router } from 'express'
import { BookController } from '../controllers/BookController'
import { BookRepository } from '../repositories/BookRepository'
import { BookService } from '../services/BookService'
import IBookController from '../interfaces/book/IBookController'
import IBookRepository from '../interfaces/book/IBookRepository'
import IBookService from '../interfaces/book/IBookService'
import { AuthController } from '../controllers/AuthController'
import { IAuthController } from '../interfaces/authentication/IAuthController'
import { AliasTopBooks } from '../middlewares/topFiveBooks'

const bookRouter = Router()

const authController: IAuthController = new AuthController()
const bookRepository: IBookRepository = new BookRepository()
const bookService: IBookService = new BookService(bookRepository)
const bookController: IBookController = new BookController(bookService)

bookRouter.route('/top-five-books').get(AliasTopBooks, bookController.getAllBooks)
bookRouter.route('/stats').get(bookController.getBookStats)

bookRouter
  .route('/')
  .get(authController.protectRoute, authController.restrictedTo('admin'), bookController.getAllBooks)
  .post(authController.protectRoute, authController.restrictedTo('admin', 'recruiter'), bookController.createBook)

bookRouter
  .route('/:id')
  .get(authController.protectRoute, authController.restrictedTo('admin'), bookController.getBookById)
  .delete(authController.protectRoute, authController.restrictedTo('admin'), bookController.deleteBookById)
  .patch(authController.protectRoute, authController.restrictedTo('admin', 'recruiter'), bookController.updateBookById)

export default bookRouter
