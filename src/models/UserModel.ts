import mongoose from 'mongoose'
import validator from 'validator'
import { IUser } from '../interfaces/IUser'

const UserSchema = new mongoose.Schema(
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
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
)

const User = mongoose.model('User', UserSchema)

export default User
