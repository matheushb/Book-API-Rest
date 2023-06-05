export default interface IBookService {
    getAllBooks(): any

    createBook(data: object): any

    getBookById(id: string): any

    updateBookById(id: string, data: object): any
    
    deleteBookById(id: string): any
}