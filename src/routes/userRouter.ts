import { Router } from 'express'
import { AuthController } from '../controllers/authController'

const userRouter = Router()
const authController = new AuthController()

userRouter.get('/', authController.protectRoute, authController.getAllUsers)
userRouter.post('/signup', authController.userSign)
userRouter.post('/login', authController.userLogin)
userRouter.delete('/:id', authController.protectRoute, authController.deleteUser)

export default userRouter
