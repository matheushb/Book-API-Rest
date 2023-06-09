export interface IUser extends Document {
  name: string
  email: string
  password: string
  passwordConfirm: string
}
