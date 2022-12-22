import React, { ChangeEvent, useState, FormEvent } from 'react'
import './auth.scss'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { toast } from 'react-toastify'
import { emailValidation } from '../../utils/emailValidation'
import { loginUser } from '../../services/authService'
import { setLoggedIn, setName } from '../../redux/features/authSlice'
import Loader from '../../components/loader/Loader'

const initState = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(initState)
  const { email, password } = userData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((perv) => ({ ...perv, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('All fields are required!')
    }
    if (!emailValidation(email)) {
      return toast.error('Please enter a valid email!')
    }
    if (password.length < 6) {
      return toast.error('Passwords must be at least 6 characters!')
    }

    setIsLoading(true)
    try {
      const logUser = await loginUser({ email, password })
      setIsLoading(false)

      dispatch(setName(logUser.name))
      dispatch(setLoggedIn(true))
      toast.success('Logged in successfully.')
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
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
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
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to='/forgot'>Forgot Password</Link>
          <span className='register'>
            <Link to='/register'>Register</Link>
            <p>Don't have an account, please register. </p>{' '}
            <Link to='/'>Home</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Login
