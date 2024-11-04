import { Router } from 'express'
import userRouter from './user.routes'
import bookRoute from './book.routes'
import authRouter from './auth.routes'

const appRouter = Router()

appRouter.use('/api', userRouter)
appRouter.use('/api', bookRoute)
appRouter.use('/api/auth', authRouter)

export default appRouter
