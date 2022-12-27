import { ReactNode } from 'react'
import './card.scss'

interface ICard {
  children: ReactNode
  cardClass?: string
}

const Card = ({ children, cardClass = 'card' }: ICard) => {
  return <div className={cardClass}>{children}</div>
}

export default Card
