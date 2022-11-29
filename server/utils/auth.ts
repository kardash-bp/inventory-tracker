import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpCode } from '../errors/errorHandler'
import { AppError } from '../errors/errorHandler'
import User, { IUser, IUserMethod, UserModel } from '../models/userModel'
import { asyncWrapper } from './asyncWrapper'

export const authToken = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token || ''

    if (!token) {
      throw new AppError({
        name: 'unauthorized',
        httpCode: HttpCode.UNAUTHORIZED,
        description: 'Not authorized, please login.',
      })
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    if (!id) {
      throw new AppError({
        name: 'unauthenticated',
        httpCode: HttpCode.FORBIDDEN,
        description: 'Invalid token.',
      })
    }
    const user = await User.findById(id).select('-password -salt -__v')
    if (!user) {
      throw new AppError({
        name: 'notFound',
        httpCode: HttpCode.NOT_FOUND,
        description: 'User not found.',
      })
    }
    req.user = user
    req.authenticated = !!user
    next()
  }
)
