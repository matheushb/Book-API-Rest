export interface IUser extends Document {
  name: string
  email: string
  password: string
  passwordConfirm: string
  createdAt: Date
  comparePass(candidatePass: string, userPass: string): Promise<boolean>
}
