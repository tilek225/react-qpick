import { createSlice } from '@reduxjs/toolkit'

const productReducer = createSlice({
    name: 'product',
    initialState: {
        product: []
    },
    reducers: {
        getProduct: (state, action) => {
            state.product = action.payload.arr
        }
    }
})

export default productReducer.reducer
export const { getProduct } = productReducer.actions;
