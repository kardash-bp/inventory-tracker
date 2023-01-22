import React, { ChangeEvent, FormEvent, useState } from 'react'
import './auth.scss'
import { TiUserAddOutline } from 'react-icons/ti'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { emailValidation } from '../../utils/emailValidation'
import { registerUser } from '../../services/authService'
import { useAppDispatch } from '../../redux/store'
import { setLoggedIn, setName } from '../../redux/features/authSlice'
import Loader from '../../components/loader/Loader'
import { useIsAuth } from '../../hooks/useIsAuth'
const initState = {
  name: '',
  email: '',
  password: '',
  password2: '',
}
const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useIsAuth()
  if (isAuth) {
    navigate('/dash')
  }
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(initState)
  const { name, email, password, password2 } = userData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((perv) => ({ ...perv, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !password2) {
      return toast.error('All fields are required!')
    }
    if (!emailValidation(email)) {
      return toast.error('Please enter valid email!')
    }
    if (password.length < 6) {
      return toast.error('Passwords must be at least 6 characters!')
    }
    if (password !== password2) {
      return toast.error('Passwords must match!')
    }
    setIsLoading(true)
    try {
      const regUser = await registerUser({ name, email, password })
      setIsLoading(false)

      dispatch(setName(regUser.name))
      dispatch(setLoggedIn(true))
      navigate('/dash')
    } catch (error: any) {
      setIsLoading(false)
      console.log(error.message)
      return toast.error('Registration problem, please try again!')
    }
  }

  return (
    <div className='container auth'>
      {isLoading && <Loader />}
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Name'
              required
              name='name'
              value={name}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='text'
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              placeholder='Password'
              required
              name='password'
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              required
              name='password2'
              value={password2}
              onChange={(e) => handleChange(e)}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>

          <p className='register'>
            {' '}
            <Link to='/'>Home</Link> Already have an account?
            <Link to='/login'>Login</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Register
