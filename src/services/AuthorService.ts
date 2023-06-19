import { IAuthor, IUpdateAuthorDTO } from '../interfaces/author/IAuthor'
import { IAuthorService } from '../interfaces/author/IAuthorService'
import { AuthorRepository } from '../repositories/AuthorRepository'

export class AuthorService implements IAuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}
  getAllAuthors = async () => {
    return this.authorRepository.getAllAuthors()
  }

  getAuthorById = async (id: string) => {
    return await this.authorRepository.getAuthorById(id)
  }

  createAuthor = async (data: IAuthor) => {
    return await this.authorRepository.createAuthor(data)
  }

  updateAuthorById = async (id: string, data: IUpdateAuthorDTO) => {
    return await this.authorRepository.updateAuthorById(id, data)
  }

  deleteAuthorById = async (id: string) => {
    return await this.authorRepository.deleteAuthorById(id)
  }
}
