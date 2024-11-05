import { createUser, deleteUser, deleteUsers, getUser, getUsers, updateUser } from '../controllers/user.controller'
import { Router } from 'express'
import { validateUserInput } from '../middlewares/validators/user.validator'
import { authorizeRole, verifyToken } from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/user', verifyToken, authorizeRole("ADMIN"), validateUserInput, createUser)
userRouter.patch('/user/:user_code', validateUserInput, updateUser)
userRouter.get('/user/:user_code', getUser)
userRouter.get('/user', verifyToken, authorizeRole("ADMIN"), getUsers)
userRouter.delete('/user/:user_code', deleteUser)
userRouter.delete('/user', verifyToken, authorizeRole("ADMIN"), deleteUsers)

export default userRouter
