import { useState, useEffect } from 'react'
import { Item, ItemArr } from './menuData'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
interface ISide {
  item: Item | ItemArr
  isOpen: boolean
}
const SideItem = ({ item, isOpen }: ISide) => {
  const [expanded, setExpanded] = useState(false)

  const activeLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active' : 'link'

  useEffect(() => {
    if (!isOpen) {
      setExpanded(false)
    }
  }, [isOpen])

  if (item.hasOwnProperty('children')) {
    const element = item as ItemArr
    return (
      <div className={expanded ? 'sidebar-item open' : 'sidebar-item'}>
        <div className='sidebar-title'>
          <span>
            {item.icon && <div className='icon'>{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className='arrow-icon'
            onClick={() => setExpanded(!expanded)}
          />
        </div>
        <div className='sidebar-content'>
          {element.children.map((child, index) => (
            <div className='s-child' key={index}>
              <NavLink to={child.path} className={activeLink}>
                <div className='child-item'>
                  <div className='sidebar-title'>{child.title}</div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    const element = item as Item
    return (
      <NavLink to={element.path} className={activeLink}>
        <div className='sidebar-item'>
          <div className='sidebar-title'>
            {' '}
            <span>
              {item.icon && <div className='icon'>{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    )
  }
}

export default SideItem
