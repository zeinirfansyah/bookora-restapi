import { Router } from 'express'
import { getAuthors } from '../controllers/book_author.controller'

const authorRoute = Router()

authorRoute.get('/book-author', getAuthors)

export default authorRoute
