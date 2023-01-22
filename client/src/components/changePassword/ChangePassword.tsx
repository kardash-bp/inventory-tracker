import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePass } from '../../services/authService'
import './ChangePassword.scss'
type TInit = {
  old: string
  pass: string
  pass2: string
}
const init = {
  old: '',
  pass: '',
  pass2: '',
} as TInit
const ChangePassword = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(init)
  const { old, pass, pass2 } = data

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (pass !== pass2) {
      return toast.error('Passwords do not match, please retype.')
    }
    console.log(data)

    const response = await changePass(old, pass)
    toast.success(response)
    navigate('/profile')
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='pass'>
        <h4>Password Change</h4>
        <input
          type='password'
          placeholder='Old Password'
          required
          name='old'
          value={old}
          onChange={(e) => handleChange(e)}
        />
        <input
          type='password'
          placeholder='New Password'
          required
          name='pass'
          value={pass}
          onChange={(e) => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Confirm New Password'
          required
          name='pass2'
          value={pass2}
          onChange={(e) => handleChange(e)}
        />
        <button type='submit' className='--btn --btn-primary'>
          Change Password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
