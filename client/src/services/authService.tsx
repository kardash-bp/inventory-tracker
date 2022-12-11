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
