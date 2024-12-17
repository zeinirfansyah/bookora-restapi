import { Router } from 'express'
import { validateUserInput } from '../middlewares/validators/user.validator'
import { authorizeRole, verifyToken } from '../middlewares/auth'
import { createUser } from '../controllers/user_controllers/create_user.controller'
import { updateUser } from '../controllers/user_controllers/update_user.controller'
import { getUser } from '../controllers/user_controllers/get_user.controller'
import { getUsers } from '../controllers/user_controllers/get_users.controller'
import { deleteUser } from '../controllers/user_controllers/delete_user.controller'
import { deleteUsers } from '../controllers/user_controllers/delete_all_users.controller'

const userRouter = Router()

userRouter.post('/user', verifyToken, authorizeRole("ADMIN"), validateUserInput, createUser)
userRouter.patch('/user/:user_code', validateUserInput, updateUser)
userRouter.get('/user/:user_code', getUser)
userRouter.get('/user', verifyToken, authorizeRole("ADMIN"), getUsers)
userRouter.delete('/user/:user_code', deleteUser)
userRouter.delete('/user', verifyToken, authorizeRole("ADMIN"), deleteUsers)

export default userRouter
