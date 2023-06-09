import { ICreateBookDTO, IUpdateBookDTO } from "../DTOs/bookDTOs"
import { IBook } from "./IBook"

export default interface IBookRepository {

    getAllBooks(): Promise<Array<IBook>>

    createBook(body: ICreateBookDTO): Promise<IBook | null>

    getBookById(id: string): Promise<IBook | null>

    updateBookById(id: string, data: object): Promise<IBook | null>
    
    deleteBookById(id: string): Promise<IBook | null>
}