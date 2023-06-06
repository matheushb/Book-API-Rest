import IBookService from "../interfaces/IBookService"
import IBookRepository from "../interfaces/IBookService"
import CreateBookDTO from '../DTOs/createBookDTO'

export class BookService implements IBookService {

    constructor(private readonly bookRepository: IBookRepository){}

        getAllBooks = () => {
            return this.bookRepository.getAllBooks();
        }

        createBook = (data: CreateBookDTO) => {
            return this.bookRepository.createBook(data);
        }

        getBookById = (id: string) => {
            return this.bookRepository.getBookById(id);
        }

        updateBookById = (id: string, data: object) => {
            return this.bookRepository.updateBookById(id, data)
        }
        
        deleteBookById = (id: string) => {
            return this.bookRepository.deleteBookById(id)
        }
}