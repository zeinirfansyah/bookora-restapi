import { Router } from 'express'
import { createBook, getBooks } from '../controllers/book.controller'
import { validateBookInput } from '../middlewares/validators/book.validator'

const bookRoute = Router()

bookRoute.get('/book', getBooks)
bookRoute.post('/book', validateBookInput, createBook)

export default bookRoute
