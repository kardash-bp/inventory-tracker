import cloudinary from 'cloudinary'
import { AppError, HttpCode } from '../errors/errorHandler'
import { asyncWrapper } from './asyncWrapper'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// upload to cloudinary

export const cloudinaryUpload = async (
  filePath: string,
  presetName: string
) => {
  try {
    let uploadedFile = await cloudinary.v2.uploader.upload(filePath, {
      upload_preset: presetName,
    })
    if (!uploadedFile) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'File upload failed.',
      })
    }
    return uploadedFile
  } catch (err: any) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: err.message,
    })
  }
}
