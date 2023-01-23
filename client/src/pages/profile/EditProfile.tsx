import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { getUser, updateUser } from '../../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Loader from '../../components/loader/Loader'
import { IUser } from '../../redux/features/types'

import './profile.scss'
import Card from '../../components/card/Card'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../../components/changePassword/ChangePassword'

const initialState = {
  name: '',
  email: '',
  phone: '',
  photo: '',
  bio: '',
} as IUser
const EditProfile = () => {
  const navigate = useNavigate()
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState(initialState)
  const [imgPreview, setImgPreview] = useState(profile.photo)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setProfile((prev) => ({ ...prev, photo: e.target.files![0] }))
      setImgPreview(URL.createObjectURL(e.target.files[0]))
    }
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', profile.name)
    formData.append('email', profile.email)
    formData.append('phone', profile.phone)
    profile.bio && formData.append('bio', profile.bio)
    formData.append('photo', profile.photo)
    dispatch(updateUser(formData))
    navigate('/profile')
  }
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  useEffect(() => {
    if (user) {
      setProfile(user)
      setImgPreview(user.photo)
    }
  }, [user])
  return (
    <>
      <form
        className='profile --my2'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        {isLoading && <Loader />}
        {!user && <p>Something went wrong.</p>}
        <Card cardClass={'card'}>
          <div>
            <img src={imgPreview} alt='user profile' />
            <label>
              Select New Photo{' '}
              <input type='file' name='photo' onChange={handleImgChange} />
            </label>
          </div>
          <div className='profile-data'>
            <label>
              Name{' '}
              <input
                type='text'
                name='name'
                value={profile.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:{' '}
              <input
                type='text'
                name='phone'
                value={profile.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:{' '}
              <input
                type='text'
                name='phone'
                value={profile.email}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              Bio:{' '}
              <textarea
                name='bio'
                value={profile.bio}
                onChange={handleChange}
                cols={40}
                rows={5}
              ></textarea>
            </label>
          </div>{' '}
        </Card>{' '}
        <button type='submit' className='--btn --btn-success --mt'>
          Save User Data
        </button>
      </form>
      <ChangePassword />
    </>
  )
}

export default EditProfile
