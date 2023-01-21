import axios from 'axios'
import { toast } from 'react-toastify'
import { IForm } from '../redux/features/types'

// const url = process.env.REACT_APP_BASE_URL
// console.log(process.env.REACT_APP_BASE_URL)

export const registerUser = async (user: IForm) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/v1/users/register`,
      user,
      {
        withCredentials: true,
      }
    )
    if (response.status === 201) {
      toast.success('New User Registered successfully')
    }
    return response.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}

export const loginUser = async (userData: IForm) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/v1/users/login`,
      userData,
      {
        withCredentials: true,
      }
    )
    if (response.status === 200) {
      toast.success('Login successful')
    }
    return response.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}

export const logoutUser = async () => {
  try {
    await axios.get(
      `http://localhost:4000/v1/users/logout`,

      {
        withCredentials: true,
      }
    )
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}

export const forgotPassword = async (userData: { email: string }) => {
  console.log('forgot test')

  try {
    const response = await axios.post(
      `http://localhost:4000/v1/users/forgot-pass`,
      userData
    )
    toast.success(response.data.message)
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}

export const resetPassword = async (
  userData: { password: string },
  resetToken: string
) => {
  console.log('forgot test')

  try {
    const response = await axios.put(
      `http://localhost:4000/v1/users/reset-pass/${resetToken}`,
      userData
    )
    return response.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
export const isAuthenticated = async () => {
  const res = await axios.get(`http://localhost:4000/v1/users/auth`)
  return res.data
}

export const singleUser = async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/v1/users/one`,

      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
export const editUser = async (user: IForm) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/v1/users/update`,
      user,

      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}

export const contactUs = async (data: any) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/v1/users/contact-us`,
      data,
      {
        withCredentials: true,
      }
    )
    if (response.status === 200) {
      toast.success(response.data.message)
    }
    return response.data
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(message)
  }
}
