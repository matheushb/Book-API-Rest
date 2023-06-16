import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { UserController } from '../controllers/UserController'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserService'

const userRouter = Router()

const authController = new AuthController()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRouter.get('/', authController.protectRoute, userController.getAllUsers)
userRouter.post('/signup', userController.userSign)
userRouter.post('/login', userController.userLogin)
userRouter.delete('/deleteSelf', authController.protectRoute, userController.deleteSelf)
userRouter.patch('/updateProfile', authController.protectRoute, userController.updateSelf)
userRouter.delete('/:id', authController.protectRoute, userController.deleteUser)

export default userRouter
