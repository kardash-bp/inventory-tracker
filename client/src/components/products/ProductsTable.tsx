import {
  AiOutlineFolderView,
  AiOutlineEdit,
  AiFillDelete,
} from 'react-icons/ai'
import { truncate } from '../../utils/truncate'
import './productsTable.scss'
import { TProduct } from '../../redux/features/types'
import { useAppDispatch } from '../../redux/store'
import { allProducts, delProduct } from '../../redux/features/productSlice'
import { useNavigate } from 'react-router-dom'
const ProductsTable = ({ products }: { products: TProduct[] }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleDelete = async (id: string) => {
    await dispatch(delProduct(id))
    await dispatch(allProducts())
  }

  return (
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
        {products.map((p, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{truncate(p.name, 15)}</td>
            <td>{p.category}</td>
            <td>{p.price} &euro;</td>
            <td>{p.quantity}</td>
            <td>{+p.price * +p.quantity} &euro;</td>
            <td className='--flex-between'>
              <AiOutlineFolderView
                className='iconBtn'
                size={22}
                color={'#007bff'}
                onClick={() => navigate(`/product-detail/${p._id}`)}
              />
              <AiOutlineEdit
                className='iconBtn'
                size={22}
                color={'#7abe42'}
                onClick={() => navigate(`/edit-product/${p._id}`)}
              />
              <AiFillDelete
                className='iconBtn'
                size={22}
                color={'#e22030'}
                onClick={(e) => {
                  e.stopPropagation()
                  window.confirm(`Are you sure you wish to delete ${p.name}`) &&
                    handleDelete(p._id)
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductsTable
