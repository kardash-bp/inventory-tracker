import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpCode } from '../errors/errorHandler'
import { AppError } from '../errors/errorHandler'
import User, { IUser, IUserMethod } from '../models/userModel'
import { asyncWrapper } from './asyncWrapper'

export const auth = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token
    if (!token) {
      throw new AppError({
        name: 'unauthorized',
        httpCode: 401,
        description: 'Not authorized, please login.',
      })
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    if (!id) {
      throw new AppError({
        name: 'unauthenticated',
        httpCode: 403,
        description: 'Invalid token.',
      })
    }
    const user = await User.findById(id).select('-password -salt -__v')
    if (!user) {
      res.clearCookie('token')
    }
    // user?.toJSON()
    res.locals.user = user
    console.log(`res.locals.user: ${res.locals.user}`)
    next()
  }
)
