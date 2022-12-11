import { createSlice } from '@reduxjs/toolkit'
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
} as IInitState

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
      state.user = { ...action.payload }
    },
  },
})

export const { setLoggedIn, setName, saveUser } = authSlice.actions

export default authSlice.reducer
