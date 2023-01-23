import React from 'react'
import ProductSummary from '../../components/products/ProductSummary'
import { useAppSelector } from '../../redux/store'

const Summary = () => {
  const { products } = useAppSelector((state) => state.product)

  return <ProductSummary products={products} />
}

export default Summary
