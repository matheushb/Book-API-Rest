import { IAuthor, IUpdateAuthorDTO } from '../interfaces/author/IAuthor'
import { IAuthorRepository } from '../interfaces/author/IAuthorRepository'
import Authors from '../models/AuthorSchema'

export class AuthorRepository implements IAuthorRepository {
  getAllAuthors = async () => {
    return await Authors.find()
  }

  getAuthorById = async (id: string) => {
    return await Authors.findOne({ _id: id })
  }

  createAuthor = async (data: IAuthor) => {
    return await Authors.create({
      name: data.name,
      age: data.age,
      nacionality: data.nacionality,
    })
  }

  updateAuthorById = async (id: string, data: IUpdateAuthorDTO) => {
    return await Authors.findByIdAndUpdate(
      id,
      {
        name: data.name,
        age: data.age,
        nacionality: data.nacionality,
      },
      {
        new: true,
      }
    )
  }

  deleteAuthorById = async (id: string) => {
    return await Authors.findByIdAndDelete(id)
  }
}
