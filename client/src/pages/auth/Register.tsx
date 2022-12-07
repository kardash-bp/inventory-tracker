import React from 'react'
import './auth.scss'
import { TiUserAddOutline } from 'react-icons/ti'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form>
            <input type='text' placeholder='Name' required name='name' />
            <input type='text' placeholder='Email' required name='email' />
            <input
              type='text'
              placeholder='Password'
              required
              name='password'
            />
            <input
              type='text'
              placeholder='Confirm Password'
              required
              name='password'
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>

          <span className='register'>
            <p>Already have an account? </p> <Link to='/login'>Login</Link>
            <Link to='/'>Home</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register
