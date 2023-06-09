import  { ICreateBookDTO, IUpdateBookDTO } from "../DTOs/bookDTOs";
import { IBook } from "../interfaces/IBook";
import IBookRepository from "../interfaces/IBookService"
import Book from "../models/bookSchema"

export class BookRepository implements IBookRepository {

        getAllBooks = async(): Promise<any> => {
                return await Book.find();
        }

        createBook = async(data: ICreateBookDTO): Promise<IBook | null> => {
                return await Book.create({
                        title: data.title,
                        totalPages: data.totalPages,
                        yearPublished: data.yearPublished,
                        price: data.price,
                        autor: data.autor,
                        editor: data.editor,
                        genre: data.genre,
                        synopsis: data.synopsis,
                        ratingAverage: data.ratingAverage,
                        ratingQuantity: data.ratingQuantity,
                        language: data.language
                })
        }

        getBookById = async(id: string): Promise<IBook | null> => {
                return await Book.findOne({_id: id})
        }

        updateBookById = async(id: string, data: IUpdateBookDTO): Promise<IBook | null> => {
                return await Book.findOneAndUpdate({_id: id}, data, {
                        runValidators: true,
                        new: true
                })
        }
        
        deleteBookById = async(id: string): Promise<IBook | null> => {
                return await Book.findOneAndDelete({_id: id})
        }
}