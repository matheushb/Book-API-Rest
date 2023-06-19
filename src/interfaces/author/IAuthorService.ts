import { IAuthor, IUpdateAuthorDTO } from './IAuthor'

export interface IAuthorService {
  getAllAuthors(): Promise<IAuthor[]>
  getAuthorById(id: string): Promise<IAuthor | null>
  createAuthor(data: IAuthor): Promise<IAuthor | null>
  updateAuthorById(id: string, data: IUpdateAuthorDTO): Promise<IAuthor | null>
  deleteAuthorById(id: string): Promise<any>
}
