import { useState, ChangeEvent, useEffect } from 'react'
import { TProduct } from '../../redux/features/types'
import Loader from '../loader/Loader'

import './productList.scss'
import Search from '../search/Search'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'
import { searchProducts } from '../../redux/features/searchSlice'
import ProductsPagination from './ProductsPagination'
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
            <p>No product were found. </p>
          ) : (
            <>
              <ProductsPagination items={filteredProducts} itemsPerPage={2} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
