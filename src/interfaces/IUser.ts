import { roles } from './IAuthController'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  passwordConfirm: string | undefined
  role: roles
  createdAt: Date
  comparePass(candidatePass: string, userPass: string): Promise<boolean>
}
