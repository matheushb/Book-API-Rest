import IBookRepository from "../interfaces/IBookService"
import Book from "../models/bookSchema"

export class BookRepository implements IBookRepository {

        getAllBooks = async() => {
                return await Book.find();
        }

        createBook = async(data: object) => {
                return await Book.create(data)
        }

        getBookById = async(id: string) => {
                return await Book.findOne({_id: id})
        }

        updateBookById = async(id: string, data: object) => {
                return await Book.findByIdAndUpdate(id, data, {
                        runValidators: true,
                })
        }
        
        deleteBookById = async(id: string) => {
                return await Book.findByIdAndDelete(id)
        }
}