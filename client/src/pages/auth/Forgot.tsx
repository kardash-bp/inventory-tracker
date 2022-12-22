import './auth.scss'
import { useState, FormEvent } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { emailValidation } from '../../utils/emailValidation'
import { forgotPassword } from '../../services/authService'
const Forgot = () => {
  const [email, setEmail] = useState('')
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !emailValidation(email)) {
      toast.error('Please enter a valid email!')
    }
    const userData = { email }
    await forgotPassword(userData)
    setEmail('')
  }
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Send Reset Email
            </button>{' '}
            <div className='links'>
              <Link to='/'>Home</Link>
              <Link to='/login'>Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Forgot
