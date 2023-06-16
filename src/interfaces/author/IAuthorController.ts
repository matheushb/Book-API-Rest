import { NextFunction, Request, Response } from 'express'

export interface IAuthorController {
  getAllAuthors(req: Request, res: Response, next: NextFunction): any
  createAuthor(req: Request, res: Response, next: NextFunction): any
  updateAuthorById(req: Request, res: Response, next: NextFunction): any
  deleteAuthorById(req: Request, res: Response, next: NextFunction): any
}
