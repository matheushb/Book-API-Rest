import { NextFunction, Request, Response } from 'express'
import { IAuthController, IDecodedPayload, roles } from '../interfaces/authentication/IAuthController'
import User from '../models/UserSchema'
import { ApiError } from '../utils/error/ApiError'
import { catchAsync } from '../utils/error/catchAsyncError'
import { getToken } from '../utils/functions/getToken'
import jwt from 'jsonwebtoken'

export class AuthController implements IAuthController {
  protectRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = getToken(req.headers.authorization)

    if (!token) return next(new ApiError('You need to be logged in to perform this action.', 401))
    const decodedPayload = <IDecodedPayload>jwt.verify(token, process.env.JWT_SECRET!)
    const user = await User.findOne({ _id: decodedPayload.id })
    if (!user) return next(new ApiError('User with this token doesnt exists, please log in again.', 401))
    if (decodedPayload.iat < Number((user.createdAt.getTime() / 1000).toFixed()))
      return next(new ApiError('Token was issued after user was created', 401))
    req.user = user
    next()
  })

  restrictedTo = (...roles: roles[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) throw new ApiError('You need to be logged in to perform this action.', 401)
      return next()
    })
  }
}
