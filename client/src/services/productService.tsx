import axios, { AxiosPromise } from 'axios'
import { toast } from 'react-toastify'
import { TProduct } from '../redux/features/types'

export const createProduct = async (data: TProduct) => {
  console.log(data)

  try {
    const res = await axios.post<TProduct>(
      `http://localhost:4000/v1/products/add`,
      data
    )
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
    const res = await axios.get<TProduct[]>(
      `http://localhost:4000/v1/products/all`
    )
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
    const res = await axios.delete<{ message: string }>(
      `http://localhost:4000/v1/products/${id}`
    )
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
export const getProduct = async (id: string) => {
  try {
    const res = await axios.get<TProduct>(
      `http://localhost:4000/v1/products/${id}`
    )
    return res.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
export const updateProduct = async (id: string, data: TProduct) => {
  try {
    const res = await axios.patch(
      `http://localhost:4000/v1/products/${id}`,
      data
    )
    return res.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
