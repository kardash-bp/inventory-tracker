import './auth.scss'
import { MdPassword } from 'react-icons/md'
import Card from '../../components/card/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { resetPassword } from '../../services/authService'
const initState = {
  password: '',
  password2: '',
}

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState(initState)
  const { password, password2 } = userData
  const { resetToken } = useParams()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((perv) => ({ ...perv, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      return toast.error('Passwords must be at least 6 characters!')
    }
    if (!password || !password2) {
      return toast.error('All fields are required!')
    }
    if (password !== password2) {
      return toast.error('Passwords do not match!')
    }

    setIsLoading(true)
    try {
      const res = await resetPassword({ password }, resetToken!)
      setIsLoading(false)

      toast.success(res.message)
      navigate('/login')
    } catch (error: any) {
      setIsLoading(false)
      console.log(error.message)
      return toast.error('Reset problem, please try again!')
    }
  }

  return (
    <div className='container auth'>
      {isLoading && <Loader />}
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='password'
              placeholder='New Password'
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
              Reset Password
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

export default Reset
