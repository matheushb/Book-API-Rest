import { NextFunction, Request, Response } from 'express'

export interface IAuthorController {
  getAllAuthors(req: Request, res: Response, next: NextFunction): Promise<Response>
  getAuthorById(req: Request, res: Response, next: NextFunction): Promise<Response>
  createAuthor(req: Request, res: Response, next: NextFunction): Promise<Response>
  updateAuthorById(req: Request, res: Response, next: NextFunction): Promise<Response>
  deleteAuthorById(req: Request, res: Response, next: NextFunction): Promise<Response>
}
