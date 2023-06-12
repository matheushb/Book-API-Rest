import { IUser } from './IUser'

export {}

declare global {
  namespace Express {
    export interface Request {
      user: IUser
    }
  }
}
