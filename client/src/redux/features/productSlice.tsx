import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createProduct, getProducts } from '../../services/productService'
import { TProduct } from './types'

type TProductsState = {
  product: TProduct | null
  products: TProduct[]
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
} as TProductsState
export const newProduct = createAsyncThunk(
  'product/create',
  async (data: any, thunkAPI) => {
    try {
      return await createProduct(data)
    } catch (error: any) {
      const message =
        (error.response?.data && error.response.data.message) ||
        error.message ||
        error.toString()

      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const allProducts = createAsyncThunk(
  'product/getAll',
  async (_, thunkAPI) => {
    try {
      return await getProducts()
    } catch (error: any) {
      const message =
        (error.response?.data && error.response.data.message) ||
        error.message ||
        error.toString()

      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      console.log('all products')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(newProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      console.log(action.payload)
      state.products.push(action.payload)
      toast.success('Product added successfully')
    })
    builder.addCase(newProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      toast.error(`${action.payload}`)
    })
    builder.addCase(allProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(allProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      console.log(action.payload)
      state.products = action.payload
    })
    builder.addCase(allProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      toast.error(`${action.payload}`)
    })
  },
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer
