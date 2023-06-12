import { NextFunction, Request, Response } from 'express'

export type roles = 'admin' | 'user' | 'recruiter'

export interface IDecodedPayload {
  id: string
  iat: number
  exp: number
}

export interface IAuthController {
  userSign(req: Request, res: Response, next: NextFunction): Promise<any>
  userLogin(req: Request, res: Response, next: NextFunction): Promise<any>
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<any>
  protectRoute(req: Request, res: Response, next: NextFunction): void
  restrictedTo(...roles: roles[]): NextFunction
}
