import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
        deliveryPrice: 88
    },
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`increased ${state.cartItems[itemIndex].title}  cart quantity`, {
                    position: "bottom-left"
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left"
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(item => item.id !== action.payload.id)

            state.cartItems = nextCartItems
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.error(`${action.payload.title} removed from cart`, {
                position: "bottom-left"
            })
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => {
                return item.id === action.payload.id
            })

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Deacreased ${action.payload.title} cart quantity`, {
                    position: "bottom-left"
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(item => item.id !== action.payload.id)

                state.cartItems = nextCartItems
                toast.error(`${action.payload.title} removed from cart`, {
                    position: "bottom-left"
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart(state, action) {
            state.cartItems = []

            toast.error(`Cart cleared`, {
                position: "bottom-left"
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce((acc, rec) => {
                const { price, cartQuantity } = rec
                const itemTotal = price * cartQuantity

                acc.total += itemTotal
                acc.quantity += cartQuantity

                return acc
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total + state.deliveryPrice
        },
        clearOrder(state, action) {
            state.cartItems = []
        }
    }
})

export default cartReducer.reducer
export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, clearOrder } = cartReducer.actions;