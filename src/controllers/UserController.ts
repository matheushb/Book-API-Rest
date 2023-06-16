import { IUserController } from '../interfaces/user/IUserController'
import { NextFunction, Request, Response } from 'express'
import User from '../models/UserSchema'
import { ApiError } from '../utils/error/ApiError'
import { catchAsync } from '../utils/error/catchAsyncError'
import { IUserService } from '../interfaces/user/IUserService'

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  userSign = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body) return next(new ApiError('No data received', 401))
    const data = await this.userService.userSign(req.body)

    res.cookie('JWT', data.token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })

    res.status(201).json({
      status: 'success',
      data,
    })
  })

  userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body.password || !req.body.email) return next(new ApiError('Please send Email and password', 401))

    const data = await this.userService.userLogin(req.body)

    res.cookie('JWT', data.token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })

    res.status(200).json({
      status: 'success',
      data,
    })
  })

  getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await this.userService.getAllUsers()

    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  })

  deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await this.userService.deleteUser(req.params.id)

    res.status(200).json({
      status: 'success',
      'Data deleted': data,
    })
  })

  updateSelf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm || req.body.role)
      return next(new ApiError('Invalid fields received through body.', 400))

    const updatedUser = await this.userService.updateSelf(req.body, req.user)

    res.status(200).json({
      status: 'success',
      updatedUser,
    })
  })

  deleteSelf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await this.userService.deleteSelf(req.user)
    res.status(204).json({
      status: 'success',
      message: 'Your account have been deactivated.',
    })
  })
}
