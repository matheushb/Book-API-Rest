import { NextFunction, Request, Response } from 'express'
import { IAuthController, IDecodedPayload } from '../interfaces/IAuthController'
import User from '../models/UserModel'
import { ApiError } from '../utils/ApiError'
import { catchAsync } from '../utils/catchAsyncError'
import jwt from 'jsonwebtoken'

export class AuthController implements IAuthController {
  //
  signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }

  userSign = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body) return next(new ApiError('No data received', 401))
    const data = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      createdAt: req.body.createdAt,
    })
    const token = this.signToken(data.id)
    res.status(201).json({
      status: 'success',
      data,
      token,
    })
  })

  userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body.password || !req.body.email) return next(new ApiError('Please send Email and password', 401))
    const user = await User.findOne({ email: req.body.email }, { email: 1, password: 1, createdAt: 1 })
    if (!user || !(await user?.comparePass(req.body.password, user.password)))
      return next(new ApiError('Wrong email or password.', 401))

    const token = this.signToken(user.id)
    console.log(token)

    res.status(200).json({
      status: 'success',
      user,
      token,
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

  deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await User.findOneAndDelete({ _id: req.params.id })
    console.log(data)
    res.status(200).json({
      status: 'success',
      data,
    })
  })

  protectRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return next(new ApiError('Please Log In to access routes.', 401))
    const decodedPayload = <IDecodedPayload>jwt.verify(token, process.env.JWT_SECRET!)
    const user = await User.findOne({ _id: decodedPayload.id })
    if (!user) return next(new ApiError('Please Log In again.', 401))
    req.user = user
    next()
  })
}
