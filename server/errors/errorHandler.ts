import { NextFunction, Request, Response } from 'express'

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
interface AppErrorArgs {
  name?: string
  httpCode: HttpCode
  description: string
  isOperational?: boolean
}
export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode
  public readonly isOperational: boolean = true

  constructor(args: AppErrorArgs) {
    super(args.description)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = args.name || 'Error'
    this.httpCode = args.httpCode

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational
    }
    Error.captureStackTrace(this)
  }
}
class ErrorHandler {
  public isGuestError(error: Error): boolean {
    if (error instanceof AppError) return error.isOperational

    return false
  }
  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isGuestError(error) && response) {
      this.handleGuestError(error as AppError, response)
    } else {
      this.handleCriticalError(error, response)
    }
  }

  private handleGuestError(error: AppError, response: Response): void {
    response.status(error.httpCode).json({ message: error.message })
  }
  private handleCriticalError(error: Error | AppError, response?: Response) {
    //console.log('critical: ->', error)
    if (response && error.name === 'CastError') {
      response.status(HttpCode.BAD_REQUEST).json({ message: error.message })
    } else if (response) {
      console.log(`Response: -> ${response}`)
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    } else {
      console.log('Application encountered a critical error.')
      process.exit(1)
    }
  }
}

export const errorHandler = new ErrorHandler()
