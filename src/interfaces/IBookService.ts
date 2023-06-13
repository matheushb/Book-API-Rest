import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from './IBook'
export default interface IBookService {
  getAllBooks(fullQuery: Object): Promise<IBook[]>

  createBook(data: ICreateBookDTO): Promise<IBook | null>

  getBookById(id: string): Promise<IBook | null>

  updateBookById(id: string, data: IUpdateBookDTO): Promise<IBook | null>

  deleteBookById(id: string): Promise<IBook | null>
}

export interface QueryFilter extends Object {
  [key: string]: any
  page?: number
  sort?: string
  limit?: number
  fields?: any
}
