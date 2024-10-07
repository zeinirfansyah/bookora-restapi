import { createUser } from '../controllers/user.controller'
import { Router } from 'express'
import { validateUserInput } from '../middlewares/validators/user.validator'

const userRouter = Router()

userRouter.post('/user', validateUserInput, createUser)

export default userRouter
