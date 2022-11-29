import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    )
  },
})
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype.split('/')[1] === 'png' ||
    file.mimetype.split('/')[1] === 'jpg' ||
    file.mimetype.split('/')[1] === 'jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export const upload = multer({ storage: storage, fileFilter })
