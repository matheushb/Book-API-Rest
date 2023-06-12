import IBookService from '../interfaces/IBookService'
import IBookRepository from '../interfaces/IBookService'
import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from '../interfaces/IBook'

export class BookService implements IBookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  getAllBooks = (queryParams: any): Promise<Array<IBook>> => {
    if (Object.keys(queryParams).length !== 0) {
      const excludedFields = ['page', 'sort', 'limit', 'fields']
      excludedFields.forEach(el => {
        delete queryParams[el]
      })
    }
    const queryStr = JSON.stringify(queryParams).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    return this.bookRepository.getAllBooks(JSON.parse(queryStr))
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
