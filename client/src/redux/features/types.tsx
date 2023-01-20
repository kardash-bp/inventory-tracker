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
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
}
export type TProduct = {
  _id: string
  name: string
  category: string
  quantity: string
  description: string
  price: string
  sku: string | 'SKU'
  userId: string
  image: TFile
}
type TFile = {
  fileName: string
  filePath: string
  fileType: string
  fileSize: string
}
