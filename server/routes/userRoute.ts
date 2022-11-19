import express, { Request, Response } from 'express'
import {
  register,
  login,
  logout,
  getUsers,
  getUser,
} from '../controllers/userController'
import { asyncWrapper } from '../utils/asyncWrapper'
import { AppError, HttpCode } from '../errors/errorHandler'
import { auth } from '../utils/auth'

const router = express.Router()

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.get('/logout', asyncWrapper(logout))
router.get('/one', auth, getUser)
router.get('/all', auth, getUsers)

export default router
