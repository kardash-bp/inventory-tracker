import React, { ReactNode, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdOutlineInventory } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import menu from './menuData'
import './sidebar.scss'
import SideItem from './SideItem'
const Sidebar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <div className='layout'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
        <div className='top_section'>
          <div
            style={{
              display: isOpen ? 'block' : 'none',
            }}
          >
            <MdOutlineInventory
              size={35}
              color='#fce411'
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </div>
          <div className='bars' style={{ marginLeft: isOpen ? '100px' : '0' }}>
            <HiMenuAlt3 color='#fce411' onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => (
          <SideItem key={index} item={item} isOpen={isOpen} />
        ))}
      </div>
      <div className='main'>{children}</div>
    </div>
  )
}

export default Sidebar
