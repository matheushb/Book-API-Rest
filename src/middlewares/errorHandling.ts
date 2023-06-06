import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandlingMiddleware = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
    
    const statusCode = error.statusCode ?? 500
    const message = error.message = '' ? 'Internal Server Error.' : error.message
    console.log(error.stack);
    
    res.status(statusCode).json({
        name : error.name,
        message,
    })


}