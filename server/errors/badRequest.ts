import { HttpCode } from './errorHandler'

class BadRequestError extends Error {
  public readonly statusCode: HttpCode
  constructor(message: string) {
    super(message)
    this.statusCode = HttpCode.BAD_REQUEST
  }
}
export default BadRequestError
