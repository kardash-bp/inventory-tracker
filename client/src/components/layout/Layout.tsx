import React, { ReactNode } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className='--pad' style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
