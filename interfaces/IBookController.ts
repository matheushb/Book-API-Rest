import { NextFunction, Request, Response } from "express";

export default interface IBookController {
    getAllBooks(req: Request, res: Response, next: NextFunction): Promise<any>
    createBook(req: Request, res: Response, next: NextFunction): Promise<any>
    getBookById(req: Request, res: Response, next: NextFunction): Promise<any>
    updateBookById(req: Request, res: Response, next: NextFunction): Promise<any>
    deleteBookById(req: Request, res: Response, next: NextFunction): Promise<any>
}