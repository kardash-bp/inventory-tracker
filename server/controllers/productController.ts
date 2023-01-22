import { NextFunction, Request, Response } from 'express'
import { AppError, HttpCode } from '../errors/errorHandler'
import { asyncWrapper } from '../utils/asyncWrapper'
import Product from '../models/productModel'
import { fileSizeFormatter } from '../utils/fileSizeFormatter'
import { cloudinaryUpload } from '../utils/cloudinary'

export const addProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { name, sku, category, quantity, price, description } = req.body
    if (!name || !category || !quantity || !price || !description) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Please make sure all fields are filled in correctly.',
      })
    }

    let fileData = {}
    if (req.file) {
      // upload to cloudinary
      let uploadedFile = await cloudinaryUpload(req.file.path, 'inventracker')

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      }
    }
    console.log(fileData)

    const product = await Product.create({
      user: req.user?._id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
      image: fileData,
    })
    if (!product) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Can't create a new product..",
      })
    }
    res.status(HttpCode.CREATED).json(product)
  }
)

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const products = await Product.find({ user: req.user!._id }).sort(
      '-createdAt'
    )
    if (!products) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Not found.',
      })
    }

    res.status(HttpCode.OK).json(products)
  }
)
export const getProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.proId)
    if (!product) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Product not found.',
      })
    }
    console.log(product.user.toString())
    console.log(req.user!._id)
    if (product.user.toString() !== req.user!._id.valueOf()) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        description: 'Not authorized.',
      })
    }
    res.status(HttpCode.OK).json(product)
  }
)
export const delProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.proId)
    if (!product) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Product not found.',
      })
    }

    if (product.user.toString() !== req.user!._id.valueOf()) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        description: 'Not authorized.',
      })
    }
    await product.remove()
    res.status(HttpCode.OK).json({ message: 'Product successfully deleted ' })
  }
)
//* update product =============================================

export const updateProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const prod = await Product.findById(req.params.proId)
    if (!prod) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Product not found.',
      })
    }
    if (prod.user.toString() !== req.user!._id.valueOf()) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        description: 'Not authorized.',
      })
    }
    const { name, sku, category, quantity, price, description } = req.body
    // if (!name || !category || !quantity || !price || !description) {
    //   throw new AppError({
    //     httpCode: HttpCode.BAD_REQUEST,
    //     description: 'Please make sure all fields are filled in correctly.',
    //   })
    // }

    let fileData = {}
    if (req.file) {
      // upload to cloudinary
      let uploadedFile = await cloudinaryUpload(req.file.path, 'inventracker')

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      }
    }

    // Update product
    const updated = await Product.findByIdAndUpdate(
      req.params.proId,
      {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? prod?.image : fileData,
      },
      { new: true, runValidators: true }
    )
    if (!updated) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Can't create a new product..",
      })
    }
    res.status(HttpCode.OK).json(updated)
  }
)
