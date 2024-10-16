import { createUser, getUser, getUsers, updateUser } from '../controllers/user.controller'
import { Router } from 'express'
import { validateUserInput } from '../middlewares/validators/user.validator'

const userRouter = Router()

userRouter.post('/user', validateUserInput, createUser)
userRouter.patch('/user/:user_code', validateUserInput, updateUser)
userRouter.get('/user/:user_code', getUser)
userRouter.get('/user', getUsers)

export default userRouter
