import { useEffect } from 'react'
import ProductList from '../../components/products/ProductList'
import ProductSummary from '../../components/products/ProductSummary'
import { allProducts } from '../../redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

const Dashboard = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const { products, isLoading, isError, message } = useAppSelector(
    (state) => state.product
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(allProducts())
    }
    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])
  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}

export default Dashboard
