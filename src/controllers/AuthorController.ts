import { Request, Response, NextFunction } from 'express'
import { IAuthorController } from '../interfaces/author/IAuthorController'
import { catchAsync } from '../utils/error/catchAsyncError'
import Authors from '../models/AuthorSchema'
import { ApiError } from '../utils/error/ApiError'

export class AuthorController implements IAuthorController {
  getAllAuthors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await Authors.find()
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  })
  createAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await Authors.create({
      name: req.body.name,
      age: req.body.age,
      nacionality: req.body.nacionality,
    })
    res.status(201).json({
      status: 'success',
      'Data Created': data,
    })
  })
  updateAuthorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author = await Authors.findById(req.params.id)
    if (!author) return next(new ApiError('No author found to update.', 404))
    const data = await Authors.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        nacionality: req.body.nacionality,
      },
      {
        new: true,
      }
    )

    res.status(200).json({
      status: 'success',
      'Data updated': data,
    })
  })
  deleteAuthorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author = await Authors.findById(req.params.id)
    if (!author) return next(new ApiError('No author found to update.', 404))
    const data = await Authors.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success',
      'Data updated': data,
    })
  })
}
