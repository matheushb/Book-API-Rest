import { updateSelfDTO } from '../DTOs/user/updateSelfDTO'
import { userLoginDTO } from '../DTOs/user/userLoginDTO'
import { userSignDTO } from '../DTOs/user/userSignDTO'
import { IUser } from '../interfaces/user/IUser'
import { IUserRepository } from '../interfaces/user/IUserRepository'
import User from '../models/UserSchema'

export class UserRepository implements IUserRepository {
  userSign = async (data: userSignDTO) => {
    return await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      role: data.role,
    })
  }

  userLogin = async (data: userLoginDTO) => {
    return await User.findOne({ email: data.email }, { _id: 1, email: 1, password: 1 })
  }

  getAllUsers = async () => {
    return await User.find({ active: { $ne: false } })
  }

  deleteUser = async (id: string) => {
    return await User.findOneAndDelete({ _id: id })
  }

  updateSelf = async (data: updateSelfDTO, user: IUser) => {
    return await User.findByIdAndUpdate(
      user._id,
      {
        name: data.name,
        email: data.email,
      },
      {
        runValidators: true,
        new: true,
      }
    )
  }

  deleteSelf = async (user: IUser) => {
    return await User.findByIdAndUpdate(user._id, { active: false })
  }
}
