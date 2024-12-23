import { Router } from 'express'
import { getAuthors } from '../controllers/book_author_controllers/get_all_book_author.controller'
import { createAuthor } from '../controllers/book_author_controllers/create_book_author.controller'
import { authorizeRole, verifyToken } from '../middlewares/auth'
import { validateAuthorInput } from '../middlewares/validators/book_author.validator'

const authorRoute = Router()

authorRoute.get('/book-author', getAuthors)
authorRoute.post('/book-author', verifyToken, authorizeRole('ADMIN'), validateAuthorInput, createAuthor)

export default authorRoute
