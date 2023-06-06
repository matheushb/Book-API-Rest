export default interface IBookRepository {
    getAllBooks(): any

    createBook(body: object): any

    getBookById(id: string): any

    updateBookById(id: string, body: object): any
    
    deleteBookById(id: string): any
}