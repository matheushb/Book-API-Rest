import IBookController from "../interfaces/IBookController"
import IBookService from "../interfaces/IBookService";
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from "../utils/catchAsyncError";

export class BookController implements IBookController {

    constructor(private readonly bookService: IBookService){}

        getAllBooks = catchAsync(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
            const data = await this.bookService.getAllBooks()

            return res.status(200).json({
                status: 'success',
                results: data.length,
                data
            })
        })

        createBook = catchAsync(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
            const data = await this.bookService.createBook(req.body)

            return res.status(201).json({
                status: 'success',  
                message: 'Data created',
                data
            })
        })

        getBookById = catchAsync(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
            const data = await this.bookService.getBookById(req.params.id)

            return res.status(200).json({
                status: 'success',
                data
            })

        })

        updateBookById = catchAsync(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
            const data = await this.bookService.updateBookById(req.params.id, req.body)
            
            return res.status(201).json({
                status: 'success',
                message: 'Book Updated!',
                data
            })
        })

        deleteBookById = catchAsync(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
            const data = await this.bookService.deleteBookById(req.params.id)
            
            return res.status(200).json({
                status: 'success',
                message: 'Book Deleted!',
                data
            })
        })

        // title: req.body.title,
        // totalPages: req.body.totalPages,
        // yearPublished: req.body.yearPublished,
        // price: req.body.price,
        // autor: req.body.autor,
        // editor: req.body.editor,
        // publisher: req.body.publisher,
        // genre: req.body.genre,
        // synopsis: req.body.synopsis,
        // rating: req.body.rating,
        // language: req.body.language
}