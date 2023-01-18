import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import DOMPurify from 'dompurify'
import Card from '../card/Card'
import Loader from '../loader/Loader'
import './productDetail.scss'
const ProductDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const { product, isLoading, isError, message } = useAppSelector(
    (state) => state.product
  )

  useEffect(() => {
    if (isLoggedIn === true && id !== undefined) {
      dispatch(getSingleProduct(id))
    }
    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch, id])

  return (
    <div className='detail'>
      <h2>{product?.name}</h2>

      <Card cardClass='card'>
        {isLoading && <Loader />}
        {product && (
          <div className='prod'>
            <h4>Category: {product?.category}</h4>
            <h4>
              Quantity:{' '}
              {Number(product?.quantity) === 0 ? (
                <span>Out of stock</span>
              ) : (
                <span>{product?.quantity}</span>
              )}
            </h4>

            <h4>Price: {product?.price} &euro;</h4>
            <h4>
              Total in stock: {+product?.price * +product?.quantity} &euro;
            </h4>
            <h4>Price: {product?.price} &euro;</h4>
            {product?.image ? (
              <p>
                <img src={product.image.filePath} alt={product.name} />
              </p>
            ) : (
              <p>No image for this product.</p>
            )}
            <h4>Description:</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          </div>
        )}
      </Card>
    </div>
  )
}

export default ProductDetail
