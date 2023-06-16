import { IUser } from '../user/IUser'

export {}

declare global {
  namespace Express {
    export interface Request {
      user: IUser
    }
  }
}
