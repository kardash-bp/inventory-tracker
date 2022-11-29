import express, { Request, Response } from 'express'
import {
  register,
  login,
  logout,
  getUsers,
  getUser,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  contactUs,
} from '../controllers/userController'
import { asyncWrapper } from '../utils/asyncWrapper'
import { authToken } from '../utils/auth'

const router = express.Router()

router.post('/contact-us', authToken, asyncWrapper(contactUs))
router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.get('/logout', asyncWrapper(logout))
router.get('/one', authToken, getUser)
router.get('/all', authToken, getUsers)
router.patch('/update', authToken, updateUser)
router.patch('/change-pass', authToken, changePassword)
router.post('/forgot-pass', forgotPassword)
router.put('/reset-pass/:token', resetPassword)

export default router
