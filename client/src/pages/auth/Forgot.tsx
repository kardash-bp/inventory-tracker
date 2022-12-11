import './auth.scss'
import { AiOutlineMail } from 'react-icons/ai'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Forgot = () => {
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form>
            <input type='text' placeholder='Email' required name='email' />
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
