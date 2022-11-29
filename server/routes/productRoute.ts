import { Router, Request, Response } from 'express'
import {
  addProduct,
  getAllProducts,
  getProduct,
  delProduct,
  updateProduct,
} from '../controllers/productController'
import { asyncWrapper } from '../utils/asyncWrapper'
import { AppError, HttpCode } from '../errors/errorHandler'
import { authToken } from '../utils/auth'
import { upload } from '../utils/uploadFile'

const router = Router()

router.post('/add', authToken, upload.single('image'), addProduct)
router.get('/all', authToken, getAllProducts)
router.get('/:proId', authToken, getProduct)
router.delete('/:proId', authToken, delProduct)
router.patch('/:proId', authToken, upload.single('image'), updateProduct)

export default router
