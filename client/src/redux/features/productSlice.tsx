import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../../services/productService'
import { TProduct } from './types'

type TProductsState = {
  product: TProduct | null
  products: TProduct[]
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
  total: number
  unavailable: number
}

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  total: 0,
  unavailable: 0,
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
export const delProduct = createAsyncThunk(
  'product/delete',
  async (id: string, thunkAPI) => {
    try {
      return await deleteProduct(id)
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
export const getSingleProduct = createAsyncThunk(
  'product/get',
  async (id: string, thunkAPI) => {
    try {
      return await getProduct(id)
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
export const updProduct = createAsyncThunk(
  'product/update',
  async ({ id, formData }: { id: string; formData: any }, thunkAPI) => {
    try {
      return await updateProduct(id, formData)
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
    setTotal(state, action) {
      state.total = action.payload.reduce(
        (acc: number, cur: TProduct) =>
          acc + Number(cur.price) * Number(cur.quantity),
        0
      )
    },
    setUnavailable(state, action) {
      state.unavailable = action.payload.reduce(
        (acc: number, cur: TProduct) => {
          if (Number(cur.quantity) === 0) {
            return acc + 1
          } else {
            return acc
          }
        },
        0
      )
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
      state.products = action.payload
    })
    builder.addCase(allProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      toast.error(`${action.payload}`)
    })
    builder.addCase(delProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(delProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      toast.success('Product deleted successfully.')
    })
    builder.addCase(delProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      toast.error(`${action.payload}`)
    })
    builder.addCase(getSingleProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.product = action.payload
    })
    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      toast.error(`${action.payload}`)
    })
    builder.addCase(updProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.product = action.payload
      toast.success('Product updated successfully.')
    })
    builder.addCase(updProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      toast.error(`${action.payload}`)
    })
  },
})

export const { setTotal, setUnavailable } = productSlice.actions

export default productSlice.reducer
