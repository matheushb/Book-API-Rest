import { ICreateBookDTO, IUpdateBookDTO } from '../../DTOs/book/bookDTOs'
import { IBook } from './IBook'
export default interface IBookService {
  getAllBooks(fullQuery: Object): Promise<IBook[]>
  createBook(data: ICreateBookDTO): Promise<IBook | null>
  getBookById(id: string): Promise<IBook | null>
  updateBookById(id: string, data: IUpdateBookDTO): Promise<IBook | null>
  deleteBookById(id: string): Promise<IBook | null>
  getBookStats(): Promise<any>
}

export interface IQueryFilterDTO extends Object {
  [key: string]: any
  page?: number
  sort?: string
  limit?: number
  fields?: string
  skip?: number
}
