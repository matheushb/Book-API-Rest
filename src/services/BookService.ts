import IBookService, { QueryFilter } from '../interfaces/IBookService'
import IBookRepository from '../interfaces/IBookRepository'
import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from '../interfaces/IBook'

export class BookService implements IBookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  getAllBooks = (queryParams: any): Promise<IBook[]> => {
    let queryFilter: QueryFilter = {}
    if (Object.keys(queryParams).length !== 0) {
      const excludedFields = ['page', 'sort', 'limit', 'fields']
      excludedFields.forEach(el => {
        if (queryParams[el]) {
          queryFilter[el] = queryParams[el]
          delete queryParams[el]
        }
      })
    }
    //sort
    queryFilter.sort = '-createdAt'
    if (queryFilter.sort) queryFilter.sort = queryFilter.sort.replaceAll(',', ' ')
    //projection
    if (queryFilter.fields) queryFilter.fields = queryFilter.fields.replaceAll(',', ' ')

    if (queryFilter.page && queryFilter.limit) {
      queryFilter.page = queryFilter.limit * (queryFilter.page - 1) + 1
    }

    const queryStr = JSON.stringify(queryParams).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    return this.bookRepository.getAllBooks(JSON.parse(queryStr), queryFilter)
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
