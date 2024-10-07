import express from 'express'
import cors from 'cors'
import appRouter from '../routes'
import fileUpload from 'express-fileupload'

const appMiddleware = express()

appMiddleware.use(
    cors({
        origin: "*",
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })
)

appMiddleware.options('*', cors())
appMiddleware.use(express.json())
appMiddleware.use(express.urlencoded({ extended: true }))
appMiddleware.use(fileUpload());
appMiddleware.use(express.static('public'));
appMiddleware.use(appRouter)

export default appMiddleware
