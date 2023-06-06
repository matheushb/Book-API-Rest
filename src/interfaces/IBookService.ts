import CreateBookDTO from '../DTOs/createBookDTO'
export default interface IBookService {
    getAllBooks(): any

    createBook(data: CreateBookDTO): any

    getBookById(id: string): any

    updateBookById(id: string, data: object): any
    
    deleteBookById(id: string): any
}