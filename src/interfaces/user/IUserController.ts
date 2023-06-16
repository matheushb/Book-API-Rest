import { NextFunction, Request, Response } from 'express'

export interface IUserController {
  userSign(req: Request, res: Response, next: NextFunction): Promise<Response>
  userLogin(req: Request, res: Response, next: NextFunction): Promise<Response>
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response>
  deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response>
  updateSelf(req: Request, res: Response, next: NextFunction): Promise<Response>
  deleteSelf(req: Request, res: Response, next: NextFunction): Promise<Response>
}
