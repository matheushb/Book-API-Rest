import { NextFunction, Request, Response } from 'express'
import { IAuthController } from '../interfaces/IAuthController'
import User from '../models/UserModel'
import { ApiError } from '../utils/ApiError'
import { catchAsync } from '../utils/catchAsyncError'

export class AuthController implements IAuthController {
  //
  userSign = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body) return next(new ApiError('No data received', 401))
    const data = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      createdAt: req.body.createdAt,
    })
    res.status(201).json({
      status: 'success',
      data,
    })
  })

  userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await User.findOne({ email: req.body.email })
    if (!data || data.password !== req.body.password) return next(new ApiError('Wrong email or password.', 401))

    res.status(200).json({
      status: 'success',
      data,
    })
  })

  getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await User.find()
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  })
}
