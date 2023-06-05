import IBookController from "../interfaces/IBookController"
import IBookService from "../interfaces/IBookService";
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from "../utils/catchAsyncError";

export class BookController implements IBookController {

    constructor(private readonly bookService: IBookService){}

        getAllBooks = catchAsync( async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            const data = await this.bookService.getAllBooks()

            return res.status(200).json({
                status: 'success',
                results: data.length,
                data
            })
        })

        createBook = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
        }
        getBookById = async(req: Request, res: Response, next: NextFunction): Promise<any> => {

        }
        updateBookById = async(req: Request, res: Response, next: NextFunction): Promise<any> => {

        }
        deleteBookById = async(req: Request, res: Response, next: NextFunction): Promise<any> => {

        }
}