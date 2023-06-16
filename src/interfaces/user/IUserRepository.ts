import { updateSelfDTO } from '../../DTOs/user/updateSelfDTO'
import { userLoginDTO } from '../../DTOs/user/userLoginDTO'
import { userSignDTO } from '../../DTOs/user/userSignDTO'
import { IUser } from './IUser'

export interface IUserRepository {
  userSign(data: userSignDTO): Promise<any>
  userLogin(data: userLoginDTO): Promise<any>
  getAllUsers(): Promise<IUser[]>
  deleteUser(id: string): Promise<any>
  updateSelf(data: updateSelfDTO, user: IUser): Promise<any>
  deleteSelf(user: IUser): Promise<any>
}
