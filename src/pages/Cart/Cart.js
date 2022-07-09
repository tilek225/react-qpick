import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import emptyBg from './empty.png'
import './cart.scss'
import CartItem from './CartItem'
import * as Tb from 'react-icons/tb'
import { clearCart, getTotals } from '../../redux/reducers/cart'


const Cart = () => {
    const cart = useSelector(store => store.cart)
    const dispatch = useDispatch()
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])

    return (
        <section className='cart'>
            <div className='container'>
                {cart.cartItems?.length !== 0 ? <h2 className='cart__title-main'>Корзина</h2> : ''}

                {cart.cartItems.length === 0 ?
                    <div className='cart__empty'>
                        <img className='cart__empty-img' src={emptyBg} alt='emptyCart' />
                        <h2 className='cart__empty-title'>Корзина пуста</h2>
                        <p className='cart__empty-text'>Но это никогда не поздно исправить </p>
                        <Link to='/'><button className='cart__empty-btn'>В каталог товаров</button></Link>
                    </div>
                    : <div className='cart__inner'>
                        <div className='cart__left'>
                            {cart.cartItems?.map(item => {
                                return (
                                    <CartItem item={item} key={item.id} />
                                )
                            })}
                            <div className='cart__delivery'>
                                <h3 className='cart__delivery-title'>Доставка</h3>
                                <div className='cart__map'>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.7085288302405!2d74.59343961574642!3d42.87899581016328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb73ef59391dd%3A0xd9a25f1216632551!2zSVQtUlVOIC0g0LDQutCw0LTQtdC80LjRjyDQv9GA0L7Qs9GA0LDQvNC80LjRgNC-0LLQsNC90LjRjyDQvNC10LbQtNGD0L3QsNGA0L7QtNC90L7Qs9C-INGB0YLQsNC90LTQsNGA0YLQsA!5e0!3m2!1sen!2skg!4v1655889044763!5m2!1sen!2skg"
                                        width="570" className='cart__map-main' height="190" style={{ border: '0', borderRadius: '10px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">

                                    </iframe>
                                </div>
                                <div className='cart__delivery-info'>
                                    <p className='cart__delivery-text'>
                                        <Tb.TbTruckDelivery size={20} />
                                        Доставка курьером
                                    </p>
                                    <p className='cart__delivery-text'>{cart.deliveryPrice} сом</p>
                                </div>
                            </div>
                        </div>
                        <div className='cart__right'>
                            <div className='cart__summary'>
                                <button className='cart__clear' onClick={() => handleClearCart()}>Очистить корзину</button>
                                <div className='cart__checkout'>
                                    <div className='cart__subtotal'>
                                        <span>ИТОГО</span>
                                        <span className='cart__amount'>{cart.cartTotalAmount} сом</span>
                                    </div>
                                    <Link to='/order'>
                                        <button className='cart__checkout-btn'>Перейти к оформлению</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Cart