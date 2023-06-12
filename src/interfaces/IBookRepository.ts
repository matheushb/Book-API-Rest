import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from './IBook'

export default interface IBookRepository {
  getAllBooks(queryParams: object): Promise<Array<IBook>>

  createBook(body: ICreateBookDTO): Promise<IBook | null>

  getBookById(id: string): Promise<IBook | null>

  updateBookById(id: string, data: IUpdateBookDTO): Promise<IBook | null>

  deleteBookById(id: string): Promise<IBook | null>
}
