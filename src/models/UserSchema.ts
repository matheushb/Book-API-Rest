import mongoose from 'mongoose'
import validator from 'validator'
import { IUser } from '../interfaces/IUser'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please insert your name.'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, 'Please insert a valid email'],
      validate: [validator.isEmail, 'Email is invalid'],
    },
    password: {
      type: String,
      required: [true, 'Please insert your password'],
      minLength: [5, 'Password needs at least 5 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (this: IUser, tempPass: string) {
          return this.password === tempPass
        },
        message: 'Passwords dont match.',
      },
    },
    role: {
      type: String,
      enum: ['user', 'recruiter', 'admin'],
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    passwordResetToken: {
      type: String,
    },
    passwordChangedAt: {
      type: Number,
    },
    passwordExpiresIn: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
)

UserSchema.pre('save', async function (next: any) {
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

UserSchema.methods.comparePass = function (candidatePass: string, userPass: string): Promise<boolean> {
  return bcrypt.compare(candidatePass, userPass)
}

const User = mongoose.model('User', UserSchema)

export default User
