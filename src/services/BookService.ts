import IBookService from '../interfaces/IBookService'
import IBookRepository from '../interfaces/IBookService'
import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from '../interfaces/IBook'

export class BookService implements IBookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  getAllBooks = (): Promise<Array<IBook>> => {
    return this.bookRepository.getAllBooks()
  }

  createBook = (data: ICreateBookDTO): Promise<IBook | null> => {
    return this.bookRepository.createBook(data)
  }

  getBookById = (id: string): Promise<IBook | null> => {
    return this.bookRepository.getBookById(id)
  }

  updateBookById = (id: string, data: IUpdateBookDTO): Promise<IBook | null> => {
    return this.bookRepository.updateBookById(id, data)
  }

  deleteBookById = (id: string): Promise<IBook | null> => {
    return this.bookRepository.deleteBookById(id)
  }
}
