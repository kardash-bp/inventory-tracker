import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { logoutUser } from '../../services/authService'
import { logout } from '../../redux/features/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
  const name = useAppSelector((state) => state.auth.name)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout(''))
    localStorage.removeItem('name')
    localStorage.removeItem('user')
    toast.success('You have been logged out!')
    navigate('/login')
  }
  return (
    <div className='--pad header'>
      <div className='--flex-end'>
        <h4 className='--mr2'>
          <span className='--fw-thin'>Logged In: </span>
          <span className='--color-white'>{name}</span>
        </h4>
        <button className='--btn --btn-danger' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
