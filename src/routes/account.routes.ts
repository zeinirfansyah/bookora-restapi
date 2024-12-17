import { Router } from 'express'
import { verifyToken } from '../middlewares/auth';
import { getAuthenticatedUser } from '../controllers/user_controllers/get_authenticated_user.controller';

const userRouter = Router()

userRouter.get("/account", verifyToken, getAuthenticatedUser);

export default userRouter
