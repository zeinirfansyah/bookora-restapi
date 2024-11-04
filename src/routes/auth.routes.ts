import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import { validateUserInput } from '../middlewares/validators/user.validator'

const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/register', validateUserInput, register)

export default userRouter
