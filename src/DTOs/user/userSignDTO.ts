import { roles } from '../../interfaces/authentication/IAuthController'

export interface userSignDTO {
  name: string
  email: string
  password: string
  passwordConfirm: string | undefined
  role: roles
}
