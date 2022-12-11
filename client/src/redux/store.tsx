import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: { auth: authReducer },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use  instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
