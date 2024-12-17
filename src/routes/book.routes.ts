import { Router } from 'express'
import { createBook, getBooks } from '../controllers/book.controller'
import { validateBookInput } from '../middlewares/validators/book.validator'
import { authorizeRole, verifyToken } from '../middlewares/auth'

const bookRoute = Router()

bookRoute.get('/book', getBooks)
bookRoute.post('/book', verifyToken, authorizeRole('ADMIN'), validateBookInput, createBook)

export default bookRoute
