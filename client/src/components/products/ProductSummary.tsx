import React, { useEffect } from 'react'
import { setTotal, setUnavailable } from '../../redux/features/productSlice'
import { TProduct } from '../../redux/features/types'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import InfoSummary from '../infoSummary/InfoSummary'
import './ProductSummary.scss'
const ProductSummary = ({ products }: { products: TProduct[] }) => {
  const dispatch = useAppDispatch()
  const total = useAppSelector((state) => state.product.total)
  const out = useAppSelector((state) => state.product.unavailable)
  useEffect(() => {
    dispatch(setTotal(products))
    dispatch(setUnavailable(products))
  }, [products, dispatch])
  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Summary</h3>
      <div className='info-summary'>
        <InfoSummary
          title='Total Products'
          count={products.length}
          infoBg='card3'
        />
        <InfoSummary title='Total Value' count={total} infoBg='card2' />
        <InfoSummary title='Unavailable' count={out} infoBg='card1' />
      </div>
    </div>
  )
}

export default ProductSummary
