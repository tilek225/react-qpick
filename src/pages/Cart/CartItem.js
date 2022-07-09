import React from 'react'
import * as Md from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToCart, decreaseCart, removeFromCart } from '../../redux/reducers/cart'

const CartItem = ({ item }) => {
    console.log(item.discount);
    const dispatch = useDispatch()

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item))
    }
    const handleDeacreaseCart = (item) => {
        dispatch(decreaseCart(item))
    }
    const handleIncreaseCart = (item) => {
        dispatch(addToCart(item))
    }
    return (
        <div className='cart__item'>
            <div className='cart__item-top'>
                <div className='cart__item-img'>
                    <img src={item.image} alt={item.title} width={146} height={136} />
                </div>
                <div className='cart__item-info'>
                    <h3 className='cart__title'>{item.title}</h3>
                    <p className='cart__price'>{item.price} сом</p>
                </div>
                <div className='cart__item-delete'>
                    <button onClick={() => handleRemoveFromCart(item)}>
                        <Md.MdDelete size={35} />
                    </button>
                </div>
            </div>
            <div className='cart__item-bottom'>
                <div className='cart__item-quantity'>
                    <button className='cart__item-btn' onClick={() => handleDeacreaseCart(item)}>-</button>
                    <div style={{ fontWeight: 'bold' }}>{item.cartQuantity}</div>
                    <button className='cart__item-btn' onClick={() => handleIncreaseCart(item)}>+</button>
                </div>
                <div className='cart__item-total'>
                    {
                        item.price * item.cartQuantity
                    } сом
                </div>
            </div>
        </div>
    )
}

export default CartItem