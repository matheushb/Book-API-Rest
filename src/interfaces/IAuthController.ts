import { NextFunction, Request, Response } from 'express'

export interface IAuthController {
  userSign(req: Request, res: Response, next: NextFunction): Promise<any>
  userLogin(req: Request, res: Response, next: NextFunction): Promise<any>
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<any>
}
