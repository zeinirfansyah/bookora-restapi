import { Router } from 'express'
import userRouter from './user.routes'
import bookRoute from './book.routes'
import authRouter from './auth.routes'
import accountRouter from './account.routes'
import authorRoute from './book_author.routes'

const appRouter = Router()

appRouter.use('/api', accountRouter)
appRouter.use('/api', userRouter)
appRouter.use('/api', bookRoute)
appRouter.use('/api', authorRoute)
appRouter.use('/api/auth', authRouter)

export default appRouter
