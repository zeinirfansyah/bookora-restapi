import { Router } from 'express'
import { validateBookInput } from '../middlewares/validators/book.validator'
import { authorizeRole, verifyToken } from '../middlewares/auth'
import { getBooks } from '../controllers/book_controllers/get_all_book.controller'
import { createBook } from '../controllers/book_controllers/create_book.controller'

const bookRoute = Router()

bookRoute.get('/book', getBooks)
bookRoute.post('/book', verifyToken, authorizeRole('ADMIN'), validateBookInput, createBook)

export default bookRoute
