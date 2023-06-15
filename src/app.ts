import express, { urlencoded } from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanatize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import { errorHandlingMiddleware } from './middlewares/errorHandling'
import { databaseConnect } from './config/mongoConfig'
import userRouter from './routes/userRouter'
import bookRouter from './routes/bookRouter'
dotenv.config({ path: './src/config/.env' })

const app = express()

process.on('uncaughtException', error => {
  console.log('Server closing due to uncaught exception.')
  console.log(error)
  process.exit(1)
})

const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour',
})
app.use(helmet())
app.use(express.json({ limit: '10kb' }))
app.use(mongoSanatize())
app.use(xss())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', limiter)
app.use('/api/v1/', bookRouter)
app.use('/api/v1/users', userRouter)
app.use(errorHandlingMiddleware)
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `No route found for ${req.originalUrl}`,
  })
})

databaseConnect()

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

process.on('unhandledRejection', error => {
  console.log('Server closing due to unhandled Promise Rejection')
  console.log(error)
  server.close(() => {
    process.exit(1)
  })
})
