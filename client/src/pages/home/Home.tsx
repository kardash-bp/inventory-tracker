import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineInventory } from 'react-icons/md'
import heroImg from '../../assets/hero1.png'
import './Home.scss'
import { useAppSelector } from '../../redux/store'
const Home = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  return (
    <div className='home'>
      <nav className=' --flex-between'>
        <div className='logo'>
          <MdOutlineInventory size={35} color='#fce411' />
        </div>
        <ul className='home-links'>
          {' '}
          {!isLoggedIn && (
            <>
              <li>
                {' '}
                <Link to='/register'> Register </Link>
              </li>
              <li>
                <button className='--btn --btn-primary'>
                  <Link to='/login'> Login </Link>
                </button>
              </li>{' '}
            </>
          )}
          {isLoggedIn && (
            <li>
              <button className='--btn --btn-primary'>
                <Link to='/dash'> Dashboard </Link>
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className='container hero'>
        <div className='hero-text'>
          <h2>
            Inventory <span className='--color-yellow'>Tracker</span>
          </h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className='--flex-start'>
            <NumberText num='43K' text='Users' />
            <NumberText num='300+' text='Partners' />
          </div>
          <div className='hero-buttons'>
            <button className='--btn --btn-secondary'>
              <Link to='/dash'>Free Trial 60 Days</Link>
            </button>
          </div>
        </div>

        <div className='hero-image'>
          <img src={heroImg} alt='Inventory' />
        </div>
      </section>
    </div>
  )
}
const NumberText = ({ num, text }: { num: string; text: string }) => {
  return (
    <div className='--mr2'>
      <h3 className='--color-white'>{num}</h3>
      <p className='--color-white'>{text}</p>
    </div>
  )
}
export default Home
