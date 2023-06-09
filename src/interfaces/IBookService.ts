import { ICreateBookDTO } from '../DTOs/bookDTOs'
import { IBook } from './IBook'
export default interface IBookService {
    
    getAllBooks(): Promise<Array<IBook>>

    createBook(data: ICreateBookDTO): Promise<IBook | null>

    getBookById(id: string): Promise<IBook | null>

    updateBookById(id: string, data: object): Promise<IBook | null>
    
    deleteBookById(id: string): Promise<IBook | null>
}