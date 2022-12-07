import { createSlice } from '@reduxjs/toolkit'
interface IInitState {
  isLoggedIn: boolean
}
const initialState = {
  isLoggedIn: false,
} as IInitState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const {} = authSlice.actions

export default authSlice.reducer
