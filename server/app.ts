import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoute'
import notFound from './errors/notFound'
const app = express()
import { AppError, errorHandler, HttpCode } from './errors/errorHandler'
import { logger } from './utils/logger'
//import { StatusCodes } from 'http-status-codes'

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)
app.use('/v1/users', userRouter)
app.use('/', (req, res) => {
  res.send('Home route')
})
//! errors ==========================================================
app.get('/error-page', (req: Request, res: Response) => {
  res.status(HttpCode.OK).send(`<h1>Error Page, Sorry.</h1>`)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log('error name:', err.name)
  console.log('Error encountered:', err.message || err)

  next(err)
})
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res)
})

app.use(notFound)
export default app
