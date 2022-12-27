import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { newProduct } from '../../redux/features/productSlice'
import { useAppDispatch } from '../../redux/store'
import Card from '../card/Card'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './productForm.scss'
const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
}
// quill modules
const modules = {
  toolbar: [
    [{ font: ['sans-serif', 'serif'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      {
        color: ['white', 'red', '#7abe42', 'orange', 'blue', 'pink', 'lime'],
      },
      {
        background: ['red', 'green', 'orange', 'blue', 'pink', 'lime', 'grey'],
      },
    ],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
}
const ProductForm = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [product, setProduct] = useState(initialState)
  const [image, setImage] = useState('')
  const [imgPreview, setImgPreview] = useState('')
  const [desc, setDesc] = useState('')
  const { name, category, quantity, price } = product

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct((perv) => ({ ...perv, [e.target.name]: e.target.value }))
  }
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setImgPreview(URL.createObjectURL(e.target.files[0]))
    }
  }
  const generateSKU = (category: string) => {
    const str = category.slice(0, 3).toUpperCase()
    const num = Date.now()
    return `${str}-${num}`
  }
  const submitProduct = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('sku', generateSKU(category))
    formData.append('category', category)
    formData.append('quantity', quantity)
    formData.append('price', price)
    formData.append('description', desc)
    formData.append('image', image)
    // console.log(formData)
    await dispatch(newProduct(formData))
    navigate('/dash')
  }
  return (
    <div className='add-product'>
      <Card>
        <form onSubmit={submitProduct}>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Product Name'
            onChange={handleChange}
          />
          <input
            type='text'
            name='category'
            value={category}
            placeholder='Product Category'
            onChange={handleChange}
          />
          <input
            type='text'
            name='price'
            value={product?.price}
            placeholder='Price'
            onChange={handleChange}
          />
          <input
            type='text'
            name='quantity'
            value={product?.quantity}
            placeholder='Quantity'
            onChange={handleChange}
          />
          <ReactQuill
            modules={modules}
            theme='snow'
            value={desc}
            onChange={setDesc}
          />
          <Card cardClass={'group'}>
            <label>Product Image</label>
            <code>Supported Formats: jpg, jpeg, png</code>
            <input
              type='file'
              name='image'
              onChange={(e) => handleImgChange(e)}
            />
            {imgPreview !== null ? (
              <div className='image-preview'>
                <img src={imgPreview} alt='product' />
              </div>
            ) : (
              'Product does not have image set.'
            )}
          </Card>
          <button
            type='submit'
            className='--btn --btn-primary --btn-block --mt'
          >
            Add Product
          </button>
        </form>
      </Card>
    </div>
  )
}

export default ProductForm
