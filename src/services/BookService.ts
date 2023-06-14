import IBookService, { IQueryFilterDTO } from '../interfaces/IBookService'
import IBookRepository from '../interfaces/IBookRepository'
import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from '../interfaces/IBook'

export class BookService implements IBookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  getAllBooks = (queryParams: any): Promise<IBook[]> => {
    let queryFilter: IQueryFilterDTO = {}
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
    queryFilter.sort = queryFilter.sort ? queryFilter.sort.replaceAll(',', ' ') : '-createdAt'
    //projection
    if (queryFilter.fields) queryFilter.fields = queryFilter.fields.replaceAll(',', ' ')
    //pagination
    if (!queryFilter.page || queryFilter.page < 1) queryFilter.page = 1
    if (!queryFilter.limit || queryFilter.limit > 100 || queryFilter.limit < 1) queryFilter.limit = 100
    queryFilter.skip = (queryFilter.page - 1) * queryFilter.limit

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

  getBookStats = () => {
    return this.bookRepository.getBookStats()
  }
}
