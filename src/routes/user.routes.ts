import { type Request, type Response, Router } from 'express'

const userRouter = Router()

userRouter.get('/user', (req: Request, res: Response) => {
    res.status(200).json({ message: 'User route working!' })
})

export default userRouter
