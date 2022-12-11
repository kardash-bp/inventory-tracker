import React from 'react'
import './footer.scss'
const Footer = () => {
  return (
    <div className='footer'>
      <p>All rights reserved &copy; {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
