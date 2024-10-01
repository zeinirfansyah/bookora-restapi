import { Router } from 'express'
import userRouter from './user.routes'

const appRouter = Router()

appRouter.use('/api', userRouter)

export default appRouter
