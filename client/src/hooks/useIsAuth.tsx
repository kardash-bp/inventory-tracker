import { useState, useEffect } from 'react'
import { saveUser, setLoggedIn, setName } from '../redux/features/authSlice'
import { useAppDispatch } from '../redux/store'
import { isAuthenticated } from '../services/authService'

export const useIsAuth = () => {
  const dispatch = useAppDispatch()
  const [isAuth, setIsAuth] = useState(false)
  const userAuth = async () => {
    const data = await isAuthenticated()
    dispatch(saveUser({ ...data.user }))
    dispatch(setName(data.user.name))
    dispatch(setLoggedIn(data.isAuth))
    setIsAuth(data.isAuth)
  }
  useEffect(() => {
    userAuth()
  }, [])

  return isAuth
}
