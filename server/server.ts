import http from 'http'
import express, { NextFunction, Request, Response } from 'express'

import * as dotenv from 'dotenv'
dotenv.config()
import './db'
import app from './app'
import { AppError, errorHandler } from './errors/errorHandler'
import notFound from './errors/notFound'
import { shutDownServer } from './utils/shutDownServer'
const port = process.env.PORT || 4001

const server = http.createServer(app)
//! errors handling ==================================
process.on('uncaughtException', function (err: Error) {
  // Handle the error safely
  console.log(err.message)
  shutDownServer(server)
})
process.on('unhandledRejection', (reason, promise) => {
  console.log(reason)
  console.log(promise)
  shutDownServer(server)
})
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log('Error encountered:', err.message || err)

  next(err)
})
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(err.isOperational)
  console.log(process.exitCode)
  errorHandler.handleError(err, res)
})

app.use(notFound)
//=============================================================
server.listen(port, () => {
  console.log(
    `[server]: CORS enabled server is running at https://localhost:${port}`
  )
})
