import { Router } from 'express'
import { AuthController } from '../controllers/authController'

const userRouter = Router()
const authController = new AuthController()

userRouter.get('/', authController.getAllUsers)
userRouter.post('/sign', authController.userSign)
userRouter.post('/login', authController.userLogin)
userRouter.delete('/:id', authController.deleteUser)

export default userRouter
