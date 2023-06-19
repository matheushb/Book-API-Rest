import { Request, Response, NextFunction } from 'express'
import { IAuthorController } from '../interfaces/author/IAuthorController'
import { catchAsync } from '../utils/error/catchAsyncError'
import { ApiError } from '../utils/error/ApiError'
import { AuthorService } from '../services/AuthorService'

export class AuthorController implements IAuthorController {
  constructor(private readonly authorService: AuthorService) {}
  getAllAuthors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.authorService.getAllAuthors()
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  })

  getAuthorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.authorService.getAuthorById(req.params.id)
    res.status(200).json({
      status: 'success',
      data,
    })
  })

  createAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return next(new ApiError('No information received.', 404))
    const data = await this.authorService.createAuthor(req.body)
    res.status(201).json({
      status: 'success',
      'Data Created': data,
    })
  })

  updateAuthorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || !req.params) throw new ApiError('No information received.', 404)
    const data = await this.authorService.updateAuthorById(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      'Data updated': data,
    })
  })

  deleteAuthorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params) return next(new ApiError('No information received.', 404))
    const data = await this.authorService.deleteAuthorById(req.params.id)
    res.status(200).json({
      status: 'success',
      'Data updated': data,
    })
  })
}
