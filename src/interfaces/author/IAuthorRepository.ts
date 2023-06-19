import { IAuthor, IUpdateAuthorDTO } from './IAuthor'

export interface IAuthorRepository {
  getAllAuthors(): Promise<IAuthor[]>
  getAuthorById(id: string): Promise<IAuthor | null>
  createAuthor(data: IAuthor): Promise<IAuthor>
  updateAuthorById(id: string, data: IUpdateAuthorDTO): Promise<IAuthor | null>
  deleteAuthorById(id: string): Promise<any>
}
