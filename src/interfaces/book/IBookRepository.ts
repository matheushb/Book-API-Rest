import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from './IBook'
import { IQueryFilterDTO } from './IBookService'

export default interface IBookRepository {
  getAllBooks(queryParams: object, queryFilter: IQueryFilterDTO): Promise<IBook[]>
  createBook(body: ICreateBookDTO): Promise<IBook | null>
  getBookById(id: string): Promise<IBook | null>
  updateBookById(id: string, data: IUpdateBookDTO): Promise<IBook | null>
  deleteBookById(id: string): Promise<IBook | null>
  getBookStats(): Promise<any>
}
