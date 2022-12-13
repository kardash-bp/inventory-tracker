export interface IForm {
  name?: string
  email: string
  password: string
  bio?: string
  photo?: string
}
export interface IUser {
  name: string
  email: string
  phone: string
  bio?: string
  photo?: string
}
export interface IInitState {
  isLoggedIn: boolean
  name: string | ''
  user: IUser
  userId: string
}
