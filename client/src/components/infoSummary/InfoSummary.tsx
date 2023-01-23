import React from 'react'
import './infoSummary.scss'
import { BiCategoryAlt, BiEuro, BiCart } from 'react-icons/bi'

const InfoSummary = ({
  infoBg,
  title,
  count,
}: {
  infoBg: string
  title: string
  count: number
}) => {
  return (
    <div className={`info ${infoBg}`}>
      <span className='info-icon --color-white'>
        {infoBg === 'card3' && <BiCart size={32} />}
        {infoBg === 'card2' && <BiEuro size={32} />}
        {infoBg === 'card1' && <BiCategoryAlt size={32} />}
      </span>
      <span className='info-text'>
        <p>{title}</p>
        <p>{count}</p>
      </span>
    </div>
  )
}

export default InfoSummary
