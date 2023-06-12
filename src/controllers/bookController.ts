import IBookController from '../interfaces/IBookController'
import IBookService from '../interfaces/IBookService'
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsyncError'
import { ApiError } from '../utils/ApiError'
import Book from '../models/BookSchema'

export class BookController implements IBookController {
  constructor(private readonly bookService: IBookService) {}

  getAllBooks = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    let queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => {
      delete queryObj[el]
    })
    let data = await Book.find(queryObj)

    return res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  })

  createBook = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (Object.keys(req.body).length === 0) return next(new ApiError('Please insert data to create book', 401))
    const data = await this.bookService.createBook(req.body)

    return res.status(201).json({
      status: 'success',
      message: 'Book created',
      data,
    })
  })

  getBookById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = await this.bookService.getBookById(req.params.id)

    return res.status(200).json({
      status: 'success',
      data,
    })
  })

  updateBookById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (Object.keys(req.body).length === 0) return next(new ApiError('Please insert data to modify.', 401))
    const data = await this.bookService.updateBookById(req.params.id, req.body)

    return res.status(201).json({
      status: 'success',
      message: 'Book Updated!',
      data,
    })
  })

  deleteBookById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = await this.bookService.deleteBookById(req.params.id)

    return res.status(200).json({
      status: 'success',
      message: 'Book Deleted!',
      data,
    })
  })
}
