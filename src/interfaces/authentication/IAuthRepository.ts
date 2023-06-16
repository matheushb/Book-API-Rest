import { NextFunction, Request, Response } from 'express'

export interface IAuthRepository {
  userSign(req: Request, res: Response, next: NextFunction): Promise<any>
  userLogin(req: Request, res: Response, next: NextFunction): Promise<any>
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<any>
  protectRoute(req: Request, res: Response, next: NextFunction): NextFunction
  updateSelf(req: Request, res: Response, next: NextFunction): Promise<any>
  deleteSelf(req: Request, res: Response, next: NextFunction): Promise<any>
}
