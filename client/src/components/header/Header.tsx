import React from 'react'
import { useNavigate } from 'react-router-dom'
import { store, useAppDispatch, useAppSelector } from '../../redux/store'
import { logoutUser } from '../../services/authService'
import { logout } from '../../redux/features/authSlice'

const Header = () => {
  const name = useAppSelector((state) => state.auth.name)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout(''))
    localStorage.removeItem('name')
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Logged In Name: </span>
          <span className='--color-white'>{name}</span>
        </h3>
        <button className='--btn --btn-danger' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  )
}

export default Header
