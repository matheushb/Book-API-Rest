import { Router } from 'express'
import { AuthorController } from '../controllers/AuthorController'

const authorRouter = Router()

const authorController = new AuthorController()

authorRouter.route('/').get(authorController.getAllAuthors).post(authorController.createAuthor)
authorRouter.route('/:id').patch(authorController.updateAuthorById).delete(authorController.deleteAuthorById)

export default authorRouter
