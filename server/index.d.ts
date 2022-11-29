import { IUser } from './models/userModel'

export {}

declare global {
  namespace Express {
    export interface Request {
      authenticated?: boolean
      user?: IUser
    }
  }
}
