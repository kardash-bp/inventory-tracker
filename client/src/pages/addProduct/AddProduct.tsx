import ProductForm from '../../components/products/ProductForm'
import Loader from '../../components/loader/Loader'
import { useAppSelector } from '../../redux/store'

const AddProduct = () => {
  const isLoading = useAppSelector((state) => state.product.isLoading)

  return (
    <div>
      {isLoading && <Loader />}
      <h3>Add Product</h3>
      <ProductForm />
    </div>
  )
}

export default AddProduct
