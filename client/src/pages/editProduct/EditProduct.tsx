import { useState, useEffect } from 'react'
import ProductForm from '../../components/products/ProductForm'
import Loader from '../../components/loader/Loader'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../redux/features/productSlice'

const EditProduct = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const productToUpdate = useAppSelector((state) => state.product.product)
  const isLoading = useAppSelector((state) => state.product.isLoading)
  useEffect(() => {
    //selectProduct
    dispatch(getSingleProduct(id!))
  }, [id, dispatch])
  console.log(productToUpdate)

  return (
    <div>
      {isLoading && <Loader />}
      <h3>Edit Product</h3>
      <ProductForm flag='edit' id={id!} />
    </div>
  )
}

export default EditProduct
