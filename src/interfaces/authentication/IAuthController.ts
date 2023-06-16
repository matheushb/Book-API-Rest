import { NextFunction, Request, Response } from 'express'

export type roles = 'admin' | 'user' | 'recruiter'

export interface IDecodedPayload {
  id: string
  iat: number
  exp: number
}

export interface IAuthController {
  protectRoute(req: Request, res: Response, next: NextFunction): NextFunction
  restrictedTo(...roles: roles[]): NextFunction
}
