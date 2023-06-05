import IBookRepository from "../interfaces/IBookService"
import Book from "../models/bookSchema"

export class BookRepository implements IBookRepository {

        getAllBooks = async() => {
                return await Book.find();
        }

        createBook = async(data: object) => {

        }

        getBookById = async(id: string) => {

        }

        updateBookById = async(id: string, data: object) => {

        }
        
        deleteBookById = async(id: string) => {

        }
}