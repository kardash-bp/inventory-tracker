import { ReactNode } from 'react'
import './card.scss'

interface ICard {
  children: ReactNode
  // cardClass: string
}

const Card = ({ children }: ICard) => {
  return <div className={`card `}>{children}</div>
}

export default Card
