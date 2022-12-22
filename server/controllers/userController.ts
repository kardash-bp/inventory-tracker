import { NextFunction, Request, Response } from 'express'
import crypto from 'node:crypto'
import hashString from '../utils/cryptoHashString'
import { HttpCode } from '../errors/errorHandler'
import { AppError } from '../errors/errorHandler'
import User, { IUser } from '../models/userModel'
import Token from '../models/tokenModel'
import { asyncWrapper } from '../utils/asyncWrapper'
import { IOptions, sendEmail } from '../utils/sendEmail'
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new AppError({
      name: 'required',
      httpCode: HttpCode.BAD_REQUEST,
      description: 'Please fill in all required fields.',
    })
  }
  if (password.length < 6) {
    throw new AppError({
      name: 'shortPassword',
      httpCode: HttpCode.BAD_REQUEST,
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
      httpCode: HttpCode.BAD_REQUEST,
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

  res.status(HttpCode.CREATED).json(user)
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
      httpCode: HttpCode.BAD_REQUEST,
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
  res.status(HttpCode.CREATED).json(user)
}

export const logout = (req: Request, res: Response): void => {
  res.cookie('token', '', {
    path: '/',
    expires: new Date(0),
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
  })
  req.user = undefined
  req.authenticated = undefined
  res.redirect('/')
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user
  res.json(user)
}

export const getUsers = (req: Request, res: Response): void => {
  res.status(HttpCode.OK).json(res.locals.user)
}

export const updateUser = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    if (req.body.email) {
      delete req.body.email
    }
    const updated = Object.assign(req.user!, req.body) as IUser
    const id = updated._id.valueOf()
    const updatedUser = await User.findByIdAndUpdate(id, updated, {
      new: true,
    })

    res.status(HttpCode.OK).json(updatedUser)
  }
)

export const changePassword = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user!._id)
    if (!user) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please signup.',
      })
    }
    if (!oldPassword || !newPassword) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please add old and new password.',
      })
    }
    if (!user.isValidPassword(oldPassword)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please enter correct password.',
      })
    }
    user.password = newPassword
    await user.save()
    res.status(HttpCode.OK).send('Password change successful')
  }
)

export const forgotPassword = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.body.email) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please enter your email.',
      })
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please signup.',
      })
    }
    // remove token from db if exists
    await Token.deleteMany({ userId: user._id })
    // reset password token
    const resetToken = crypto.randomUUID() + '-' + user._id
    const hashedToken = hashString(resetToken)
    const tokenSaved = await Token.create({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 30,
    })
    const resetUrl = `${process.env.FRONT_URL}/reset/${resetToken}`
    const message = `<h2>Hello ${user.name}</h2>,

   <p> Somebody requested a new password for the [customer portal] account associated with ${user.email}.</p>
    
    <p>No changes have been made to your account yet.</p>
    
    You can reset your password by clicking the link below:
    <a href='${resetUrl}' >Reset Password</a>
    <p>If you did not request a new password, please let us know immediately by replying to this email.</p>
    
    <p>
      Yours,
      The [company] team
    </p>`
    const options = {
      subject: 'Password reset request',
      message: message,
      sendTo: user.email,
      sendFrom: process.env.EMAIL_USER,
    } as IOptions
    try {
      await sendEmail(options)
      res
        .status(HttpCode.OK)
        .json({ success: true, message: 'Reset Email Sent' })
    } catch (err) {
      console.log(err)
      throw new AppError({
        description: 'Emails fail to send.',
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      })
    }
  }
)

export const contactUs = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { subject, message } = req.body
    if (!req.authenticated) {
      throw new AppError({
        name: 'wrongCredentials',
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Wrong credentials.',
      })
    }
    if (!subject || !message) {
      throw new AppError({
        name: 'required',
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please fill in all fields.',
      })
    }
    const options = {
      subject: subject,
      message: message,
      sendTo: '',
      sendFrom: process.env.EMAIL_USER,
      replyTo: req.user!.email,
    } as IOptions
    try {
      await sendEmail(options)
      res.status(HttpCode.OK).json({ success: true, message: 'Email Sent' })
    } catch (err) {
      console.log(err)
      throw new AppError({
        description: 'Emails fail to send.',
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      })
    }
    // res.status(HttpCode.OK).send('Contact was successful')
  }
)
export const resetPassword = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = hashString(req.params.token)
    const { password } = req.body
    console.log('reset:', token)
    const tokenDb = await Token.findOne({
      token,
      expiresAt: { $gt: Date.now() },
    })
    if (!tokenDb) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Invalid or expired token.',
      })
    }
    const id = tokenDb.userId.valueOf()

    const user = await User.findOne({ _id: id })
    if (!user) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'No user with that id.',
      })
    }
    user.password = password
    await user.save()

    res.status(HttpCode.OK).send('Reset Password change successful')
  }
)
