import { Router } from 'express'
import userRouter from './user.routes'
import bookRoute from './book.routes'

const appRouter = Router()

appRouter.use('/api', userRouter)
appRouter.use('/api', bookRoute)

export default appRouter
