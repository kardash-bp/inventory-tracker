import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { getUser } from '../../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import './profile.scss'

const Profile = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  return (
    <div className='profile --my2'>
      {' '}
      {isLoading && <Loader />}
      {!user && <p>Something went wrong.</p>}
      <Card cardClass={'card --flex-dir-column'}>
        <div className='profile-photo'>
          <img src={user?.photo} alt='user profile' />
        </div>
        <div className='profile-data'>
          <p>Name: {user?.name}</p>
          <p>Phone: {user?.phone}</p>
          <p>Email: {user?.email}</p>
          <p>Bio: {user?.bio}</p>
          <Link to='/profile-update' className='--btn --btn-success --mt'>
            Edit User Data
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Profile
