import { Router } from 'express'
import { getAuthors } from '../controllers/book_author_controllers/get_all_book_author.controller'
import { createAuthor } from '../controllers/book_author_controllers/create_book_author.controller'
import { authorizeRole, verifyToken } from '../middlewares/auth'

const authorRoute = Router()

authorRoute.get('/book-author', getAuthors)
authorRoute.post('/book-author', verifyToken, authorizeRole('ADMIN'), createAuthor)

export default authorRoute
