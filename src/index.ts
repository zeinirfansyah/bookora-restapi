import express from 'express'
import 'dotenv/config'
import appMiddleware from './middlewares'

const app = express()
const port: number = process.env.PORT != null ? parseInt(process.env.PORT) : 3000

app.listen(port, () => {
  console.log(`😁 Welcome to Bookora!`)
  console.log(`🚀 Listening on port ${port}`)
})

app.use(appMiddleware)
