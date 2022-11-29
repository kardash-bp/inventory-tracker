import { Schema, Document, model, Model } from 'mongoose'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
export interface IUser {
  _id: string
  name: string
  password: string
  salt: string
  photo?: string
  bio?: string
  email: string
  createdAt?: number
}
// for statics
export interface IUserMethod {
  createToken: () => string
  isValidPassword: (pass: string) => Promise<boolean>
  isJSON: () => IUser
}

export type UserModel = Model<IUser, {}, IUserMethod>

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your name.'],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'Please enter valid email.',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password.'],
      minlength: [6, 'Password must be at least 6 characters.'],
      maxlength: [33, 'Password too long.'],
    },
    salt: {
      type: String,
    },
    photo: {
      type: String,
      required: [true, 'Please add a photo'],
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phone: {
      type: String,
      default: '+381xxx',
    },
    bio: {
      type: String,
      maxLength: [255, 'Bio must be less than 255 characters'],
      default: 'bio',
    },
  },
  {
    timestamps: true,
  }
)
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    next()
  }
  this.salt = v4()
  this.password = await crypto
    .createHmac('sha1', this.salt)
    .update(this.password)
    .digest('hex')
  next()
})
UserSchema.methods.toJSON = function () {
  delete this._doc.password
  delete this._doc.salt
  return this._doc
}
UserSchema.methods.isValidPassword = function (pass: string): boolean {
  const newHash = crypto
    .createHmac('sha1', this.salt)
    .update(pass)
    .digest('hex')

  return this.password === newHash
}
UserSchema.methods.createToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  })
}
export default model<IUser, UserModel>('User', UserSchema)
