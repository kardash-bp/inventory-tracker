import { createSlice } from '@reduxjs/toolkit'
import { TProduct } from './types'
type TSearch = {
  filteredProducts: TProduct[]
}

const initialState = {
  filteredProducts: [],
} as TSearch

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchProducts(state, action) {
      const { products, search } = action.payload
      const filtered = products.filter(
        (p: TProduct) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      )
      state.filteredProducts = filtered
    },
  },
})
export const { searchProducts } = searchSlice.actions
export default searchSlice.reducer
