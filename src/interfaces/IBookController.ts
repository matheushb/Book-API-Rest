import { NextFunction, Request, Response } from 'express'

export default interface IBookController {
  getAllBooks(req: Request, res: Response, next: NextFunction): Promise<Response>
  createBook(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getBookById(req: Request, res: Response, next: NextFunction): Promise<Response>
  updateBookById(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  deleteBookById(req: Request, res: Response, next: NextFunction): Promise<Response>
  getBookStats(req: Request, res: Response, next: NextFunction): Promise<Response>
}
