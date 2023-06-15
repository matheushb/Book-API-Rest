import { ObjectId } from 'mongodb'
import { roles } from './IAuthController'

export interface IUser extends Document {
  _id?: ObjectId
  name: string
  email: string
  password: string
  passwordConfirm: string | undefined
  role: roles
  createdAt: Date
  passwordChangedAt: number
  passwordResetToken: string
  passwordExpiresIn: number
  active: boolean
  comparePass(candidatePass: string, userPass: string): Promise<boolean>
}
