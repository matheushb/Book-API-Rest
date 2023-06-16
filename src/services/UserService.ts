import { updateSelfDTO } from '../DTOs/user/updateSelfDTO'
import { userLoginDTO } from '../DTOs/user/userLoginDTO'
import { userSignDTO } from '../DTOs/user/userSignDTO'
import { IUser } from '../interfaces/user/IUser'
import { IUserRepository } from '../interfaces/user/IUserRepository'
import { IUserService } from '../interfaces/user/IUserService'
import { ApiError } from '../utils/error/ApiError'
import { signToken } from '../utils/functions/signToken'

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  userSign = async (data: userSignDTO) => {
    const newUser = await this.userRepository.userSign(data)
    const token = signToken(String(newUser._id))
    newUser.password = ''
    return { newUser, token }
  }

  userLogin = async (data: userLoginDTO) => {
    const user = await this.userRepository.userLogin(data)
    if (!user || !user.comparePass(data.password, user.password)) throw new ApiError('Wrong Email or Password', 401)
    const token = signToken(user._id)
    return { user, token }
  }

  getAllUsers = () => {
    return this.userRepository.getAllUsers()
  }

  deleteUser = (id: string) => {
    return this.userRepository.deleteUser(id)
  }

  updateSelf = (data: updateSelfDTO, user: IUser) => {
    return this.userRepository.updateSelf(data, user)
  }

  deleteSelf = (user: IUser) => {
    return this.userRepository.deleteSelf(user)
  }
}
