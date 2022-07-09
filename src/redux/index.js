import { configureStore } from '@reduxjs/toolkit'
import user from './reducers/user'
import products from './reducers/products'
import product from './reducers/product'
import cart, { getTotals } from './reducers/cart'

const store = configureStore({
    reducer: {
        user,
        products,
        product,
        cart
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

store.dispatch(getTotals())

export default store