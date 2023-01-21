import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { editUser, singleUser } from '../../services/authService'
import { IInitState } from './types'

const name = JSON.parse(localStorage.getItem('name')!)
const initialState = {
  isLoggedIn: false,
  name: name ? name : '',
  user: {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
  userId: '',
  isSuccess: false,
  isError: false,
  isLoading: false,
} as IInitState

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    return await singleUser()
  } catch (error: any) {
    const message =
      (error.response?.data && error.response.data.message) ||
      error.message ||
      error.toString()

    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: any, thunkAPI) => {
    try {
      return await editUser(user)
    } catch (error: any) {
      const message =
        (error.response?.data && error.response.data.message) ||
        error.message ||
        error.toString()

      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload
    },
    setName(state, action) {
      localStorage.setItem('name', JSON.stringify(action.payload))
      state.name = action.payload
    },
    saveUser(state, action) {
      state.userId = action.payload._id
      state.user = { ...action.payload }
    },
    logout(state, action) {
      state.isLoggedIn = false
      state.name = action.payload
      state.userId = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.user = action.payload
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      toast.error(`${action.payload}`)
    })
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.user = action.payload
      toast.success('User successfully updated')
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      toast.error(`${action.payload}`)
    })
  },
})

export const { setLoggedIn, setName, saveUser, logout } = authSlice.actions

export default authSlice.reducer
