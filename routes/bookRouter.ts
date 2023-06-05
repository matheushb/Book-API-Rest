import express from "express";
import { BookController } from "../controllers/bookController";
import { BookRepository } from "../repositories/BookRepository";
import { BookService } from "../services/BookService";
import IBookController from "../interfaces/IBookController";
import IBookRepository from "../interfaces/IBookRepository";
import IBookService from "../interfaces/IBookService";



const bookRouter = express.Router()

const bookRepository: IBookRepository = new BookRepository
const bookService: IBookService = new BookService(bookRepository)
const bookController: IBookController = new BookController(bookService)

bookRouter
    .route('/books')
    .get(bookController.getAllBooks)
    .post(bookController.createBook)
    
bookRouter
    .route('/books/:id')
    .get(bookController.deleteBookById)
    .delete(bookController.deleteBookById)
    .patch(bookController.updateBookById)


export default bookRouter;