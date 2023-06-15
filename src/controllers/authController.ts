import { NextFunction, Request, Response } from 'express'
import { IAuthController, IDecodedPayload, roles } from '../interfaces/IAuthController'
import User from '../models/UserSchema'
import { ApiError } from '../utils/ApiError'
import { catchAsync } from '../utils/catchAsyncError'
import jwt from 'jsonwebtoken'
import { getToken } from '../utils/getToken'

export class AuthController implements IAuthController {
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
      role: req.body.role,
      createdAt: req.body.createdAt,
    })
    const token = this.signToken(data.id)
    data.password = ''
    res.cookie('JWT', token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })

    res.status(201).json({
      status: 'success',
      data,
      token,
    })
  })

  userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body.password || !req.body.email) return next(new ApiError('Please send Email and password', 401))

    const user = await User.findOne({ email: req.body.email }, { _id: 1, email: 1, password: 1 })

    if (!user || !(await user?.comparePass(req.body.password, user.password))) {
      return next(new ApiError('Wrong email or password.', 401))
    }
    const token = this.signToken(user.id)

    res.cookie('JWT', token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })

    res.status(200).json({
      status: 'success',
      user,
      token,
    })
  })

  getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await User.find({ active: { $ne: false } })
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  })

  deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await User.findOneAndDelete({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data,
    })
  })

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

  passwordReset = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id)
    user!.password = req.body.password
    user!.passwordConfirm = req.body.passwordConfirm
    user!.passwordChangedAt = Date.now()
    await user?.save()
    const token = this.signToken(user!.id)

    res.status(201).json({
      status: 'success',
      message: 'Password changed!',
      token,
    })
  })

  updateSelf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm || req.body.role)
      return next(new ApiError('Invalid fields received through body.', 400))
    console.log(req.body, req.user)

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        runValidators: true,
        new: true,
      }
    )

    res.status(200).json({
      status: 'success',
      updatedUser,
    })
  })

  deleteSelf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user._id, { active: false })
    res.status(204).json({
      status: 'success',
      message: 'Your account have been deactivated.',
    })
  })

  restrictedTo = (...roles: roles[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) throw new ApiError('You need to be logged in to perform this action.', 401)
      return next()
    })
  }
}
