import { Router } from 'express'
import { createBook, getBooks } from '../controllers/book.controller'

const bookRoute = Router()

bookRoute.get('/book', getBooks)
bookRoute.post('/book', createBook)

export default bookRoute
