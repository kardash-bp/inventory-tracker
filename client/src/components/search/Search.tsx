import { ChangeEventHandler } from 'react'
import { BiSearch } from 'react-icons/bi'
import './searchProducts.scss'
const Search = ({
  value,
  handleChange,
}: {
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <div className='s-search'>
      <BiSearch size={20} className='s-icon' />
      <input
        type='text'
        name='search'
        placeholder='Search by name'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Search
