import { NextFunction, Request, Response } from 'express'

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(
    `log: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  )
  next()
}
