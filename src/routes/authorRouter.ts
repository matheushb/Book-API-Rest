import { Router } from 'express'
import { AuthorController } from '../controllers/AuthorController'
import { AuthorRepository } from '../repositories/AuthorRepository'
import { AuthorService } from '../services/AuthorService'

const authorRouter = Router()

const authorRepository = new AuthorRepository()
const authorService = new AuthorService(authorRepository)
const authorController = new AuthorController(authorService)

authorRouter.route('/').get(authorController.getAllAuthors).post(authorController.createAuthor)

authorRouter
  .route('/:id')
  .get(authorController.getAuthorById)
  .patch(authorController.updateAuthorById)
  .delete(authorController.deleteAuthorById)

export default authorRouter
