import { ICreateBookDTO, IUpdateBookDTO } from '../DTOs/book/bookDTOs'
import { IBook } from '../interfaces/book/IBook'
import IBookRepository from '../interfaces/book/IBookRepository'
import { IQueryFilterDTO } from '../interfaces/book/IBookService'
import Book from '../models/BookSchema'
import { ApiError } from '../utils/error/ApiError'

export class BookRepository implements IBookRepository {
  getAllBooks = async (queryParams: object, queryFilter: IQueryFilterDTO): Promise<IBook[]> => {
    if (queryFilter.skip! >= (await Book.countDocuments())) throw new ApiError('This page doesnt exists!', 404)

    const query = Book.find(queryParams)
      .populate('author')
      .sort(queryFilter.sort)
      .skip(queryFilter.skip!)
      .limit(queryFilter.limit!)

    if (queryFilter.fields) query.select(queryFilter.fields)

    return query
  }

  createBook = async (data: ICreateBookDTO): Promise<IBook | null> => {
    return await Book.create({
      title: data.title,
      totalPages: data.totalPages,
      yearPublished: data.yearPublished,
      price: data.price,
      autor: data.author,
      editor: data.editor,
      genre: data.genre,
      author: data.author,
      synopsis: data.synopsis,
      ratingAverage: data.ratingAverage,
      ratingQuantity: data.ratingQuantity,
      language: data.language,
    })
  }

  getBookById = async (id: string): Promise<IBook | null> => {
    return await Book.findOne({ _id: id })
  }

  updateBookById = async (id: string, data: IUpdateBookDTO): Promise<IBook | null> => {
    return await Book.findOneAndUpdate({ _id: id }, data, {
      runValidators: true,
      new: true,
    })
  }

  deleteBookById = async (id: string): Promise<IBook | null> => {
    return await Book.findOneAndDelete({ _id: id })
  }

  getBookStats = async () => {
    return await Book.aggregate([
      {
        $match: { ratingAverage: { $gte: 0 } },
      },
      {
        $group: {
          _id: '$genre',
          numOfBooks: { $count: {} },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          avgPrice: { $avg: '$price' },
          numRatings: { $sum: '$ratingQuantity' },
          maxRating: { $max: '$ratingAverage' },
          minRating: { $min: '$ratingAverage' },
          avgRating: { $avg: '$ratingAverage' },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
    ])
  }
}
