import axios from 'axios'
import { toast } from 'react-toastify'
import { TProduct } from '../redux/features/types'

export const createProduct = async (data: TProduct) => {
  try {
    const res = await axios.post(`http://localhost:4000/v1/products/add`, data)
    console.log(res.data)
    return res.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
export const getProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/v1/products/all`)
    console.log(res.data)
    return res.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`http://localhost:4000/v1/products/${id}`)
    console.log(res.data)
    return res.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
