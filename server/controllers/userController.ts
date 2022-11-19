import { NextFunction, Request, Response } from 'express'
import { HttpCode } from '../errors/errorHandler'
import { AppError } from '../errors/errorHandler'
import User, { IUser, IUserMethod } from '../models/userModel'
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new AppError({
      name: 'required',
      httpCode: 400,
      description: 'Please fill in all required fields.',
    })
  }
  if (password.length < 6) {
    throw new AppError({
      name: 'shortPassword',
      httpCode: 400,
      description: 'Password must be at least 6 characters.',
    })
  }
  // check unique email
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new AppError({
      name: 'userExists',
      httpCode: 422,
      description: 'This email address is already used.',
    })
  }
  const user = await User.create({ name, email, password })
  if (!user) {
    throw new AppError({
      name: 'notCreated',
      httpCode: 400,
      description: 'Account not created. Try again.',
    })
  }
  user.toJSON()
  const token = user.createToken()

  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  })

  res.status(HttpCode.CREATED).json({ user })
}
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new AppError({
      name: 'required',
      httpCode: HttpCode.BAD_REQUEST,
      description: 'Please fill in all required fields.',
    })
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError({
      name: 'notFound',
      httpCode: HttpCode.BAD_REQUEST,
      description: 'User not found, please register.',
    })
  }
  // const validPass = user.isValidPassword(password)
  // console.log(validPass)
  if (!user.isValidPassword(password)) {
    throw new AppError({
      name: 'wrongCredentials',
      httpCode: 400,
      description: 'Wrong credentials.',
    })
  }
  user.toJSON()
  const token = user.createToken()

  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    // secure: true,
  })
  res.status(HttpCode.OK).json(user)
}

export const logout = (req: Request, res: Response): void => {
  res.cookie('token', '', {
    path: '/',
    expires: new Date(0),
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
  })
  res
    .status(HttpCode.OK)
    .json({ message: 'You have successfully been logged out.' })
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(`res.locals.user ONE: ${res.locals.user}`)

  next()
}

export const getUsers = (req: Request, res: Response): void => {
  console.log(`res.locals.user: ${res.locals.user}`)
  res.status(HttpCode.OK).json(res.locals.user)
}
