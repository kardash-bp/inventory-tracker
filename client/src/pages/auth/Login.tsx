import React from 'react'
import './auth.scss'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form>
            <input type='text' placeholder='Email' required name='email' />
            <input
              type='text'
              placeholder='Password'
              required
              name='password'
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
