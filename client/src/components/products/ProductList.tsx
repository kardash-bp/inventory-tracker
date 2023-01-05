import { useState, ChangeEvent, useEffect } from 'react'
import { TProduct } from '../../redux/features/types'
import { truncate } from '../../utils/truncate'
import Loader from '../loader/Loader'
import {
  AiOutlineFolderView,
  AiOutlineEdit,
  AiFillDelete,
} from 'react-icons/ai'
import './productList.scss'
import Search from '../search/Search'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { searchProducts } from '../../redux/features/searchSlice'
type TProductList = {
  products: TProduct[]
  isLoading: boolean
}

const ProductList = ({ products, isLoading }: TProductList) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { filteredProducts } = useAppSelector((state) => state.search)
  useEffect(() => {
    dispatch(searchProducts({ products, search }))
  }, [products, search, dispatch])
  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between  --flex-dir-column'>
          <span>
            <h3>Inventory</h3>
          </span>
          <span>
            <Search
              value={search}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </span>
        </div>
        {isLoading && <Loader />}
        <div className='table'>
          {!isLoading && products.length === 0 ? (
            <p>No product were found. Please add some...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>sn</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty.</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{truncate(p.name, 15)}</td>
                    <td>{p.category}</td>
                    <td>{p.price} &euro;</td>
                    <td>{p.quantity}</td>
                    <td>{+p.price * +p.quantity} &euro;</td>
                    <td className='--flex-between'>
                      <AiOutlineFolderView size={22} color={'#007bff'} />
                      <AiOutlineEdit size={22} color={'#7abe42'} />
                      <AiFillDelete size={22} color={'#e22030'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
