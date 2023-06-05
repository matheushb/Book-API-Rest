import IBookService from "../interfaces/IBookService"
import IBookRepository from "../interfaces/IBookService"

export class BookService implements IBookService {

    constructor(private readonly bookRepository: IBookRepository){}

        getAllBooks = () => {
            return this.bookRepository.getAllBooks();
        }

        createBook = (data: object) => {

        }

        getBookById = (id: string) => {

        }

        updateBookById = (id: string, data: object) => {

        }
        
        deleteBookById = (id: string) => {

        }
}