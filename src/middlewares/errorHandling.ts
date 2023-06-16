import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/error/ApiError'

export const errorHandlingMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'CastError') {
    error.message = 'Unable to find book by ID'
    error.statusCode = 404
  }

  const statusCode = error.statusCode ?? 500
  const message = (error.message = '' ? 'Internal Server Error.' : error.message)
  console.log(error.stack)

  res.status(statusCode).json({
    success: false,
    message,
  })
}
