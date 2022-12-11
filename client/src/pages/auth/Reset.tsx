import './auth.scss'
import { MdPassword } from 'react-icons/md'
import Card from '../../components/card/Card'
import { Link, useParams } from 'react-router-dom'
const Reset = () => {
  const param = useParams()
  console.log(param)
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form>
            <input
              type='password'
              placeholder='New Password'
              required
              name='password'
            />
            <input
              type='password'
              placeholder='Confirm Password'
              required
              name='password'
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
