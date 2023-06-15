import { NextFunction, Request, Response } from 'express'

export type roles = 'admin' | 'user' | 'recruiter'

export interface IDecodedPayload {
  id: string
  iat: number
  exp: number
}

export interface IAuthController {
  userSign(req: Request, res: Response, next: NextFunction): Promise<Response>
  userLogin(req: Request, res: Response, next: NextFunction): Promise<Response>
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response>
  protectRoute(req: Request, res: Response, next: NextFunction): NextFunction
  updateSelf(req: Request, res: Response, next: NextFunction): Promise<Response>
  deleteSelf(req: Request, res: Response, next: NextFunction): Promise<Response>
  restrictedTo(...roles: roles[]): NextFunction
}
