import React, { useState } from 'react'
import './order.scss'
import { useSelector, useDispatch } from 'react-redux'
import InputMask from 'react-input-mask'
import * as Bi from 'react-icons/bi'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { findUser } from '../../redux/reducers/user'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'


const Order = () => {
    const cart = useSelector(store => store.cart)
    const user = useSelector(store => store.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        watch,
        reset
    } = useForm({
        mode: 'onBlur'
    })

    const checkOutForUser = (obj) => {
        getDocs(collection(db, 'users'))
            .then(async res => {
                await dispatch(findUser({ ...user, user: obj }))
                await localStorage.setItem('user', JSON.stringify({ ...user }))
                await updateDoc(doc(db, 'users', res.docs.map(el => ({ ...el.data(), id: el.id })).find(item => item.email === user.email).id), obj)
                await navigate('/')
                await localStorage.removeItem('cartItems')
            })
    }

    const addInfo = async (data) => {
        const city = data.city
        const street = data.street
        const flat = data.flat
        const entance = data.entance
        const house = data.house

        await checkOutForUser({
            ...user, orders: [
                ...user.orders,
                {
                    city,
                    street,
                    flat,
                    entance,
                    house,
                    carts: cart.cartItems
                }
            ]
        })

        await reset()

    }

    return (
        <section className='order'>
            <div className='container'>
                <h2 className='order__mainTitle'>Оформление заказа</h2>
                <div className='order__inner'>
                    <div className='order__left'>
                        <div className='order__adress'>
                            <h3 className='order__title'>
                                <span>Доставка курьером</span>
                                <span>{cart.deliveryPrice} сом</span>
                            </h3>
                            <div className='order__adress-map'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.7085288302405!2d74.59343961574642!3d42.87899581016328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb73ef59391dd%3A0xd9a25f1216632551!2zSVQtUlVOIC0g0LDQutCw0LTQtdC80LjRjyDQv9GA0L7Qs9GA0LDQvNC80LjRgNC-0LLQsNC90LjRjyDQvNC10LbQtNGD0L3QsNGA0L7QtNC90L7Qs9C-INGB0YLQsNC90LTQsNGA0YLQsA!5e0!3m2!1sen!2skg!4v1655889044763!5m2!1sen!2skg"
                                    width="375" height="146" style={{ border: '0', borderRadius: '10px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">

                                </iframe>
                            </div>
                            <div className='order__input' >
                                <h3 className='order__input-title'>
                                    <span><Bi.BiMap /></span>
                                    <span>Адрес доставки</span>
                                </h3>
                                <form className='order__form'
                                    onSubmit={handleSubmit(addInfo)}

                                >
                                    <input className='order__form-input' {...register('city')} type='text' placeholder='Город' />
                                    <input className='order__form-input' {...register('street')} type='text' placeholder='Улица/Район' />
                                    <div className='order__form-info'>
                                        <input className='order__form-extra' {...register('flat')} type='text' placeholder='Квартира' />
                                        <input className='order__form-extra' {...register('entance')} type='text' placeholder='Подъезд' />
                                    </div>
                                    <input className='order__form-input' {...register('house')} type='text' placeholder='Дом' />
                                    <button type='submit' className='order__button'
                                    >
                                        Закончить оформление</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='order__right'>
                        <div className='order__carts'>
                            <h3 className='order__title'>Ваш заказ</h3>
                            {cart.cartItems?.length && cart.cartItems.map(item => {
                                return (
                                    <div key={item.id} className='order__cart'>
                                        <div className='order__cart-left'>
                                            <span>{item.cartQuantity}x</span>
                                            {item.title}
                                        </div>
                                        <div className='order__cart-right'>
                                            {item.price} сом
                                        </div>

                                    </div>

                                )
                            })}
                            <div className='order__carts-extra'>
                                <span >Доставка</span>
                                <span>{cart.deliveryPrice} сом</span>
                            </div>
                            <div className='order__carts-extra'>
                                <span>К оплате</span>
                                <span>{cart.cartTotalAmount} сом</span>
                            </div>
                        </div>
                        <div className='order__method'>
                            <h3 className='order__title'>Способ оплаты</h3>
                            <input type='checkbox' defaultChecked={true} />
                            <label>Наличными</label>
                        </div>
                        <div className='order__tel'>
                            <h3 className='order__title'>
                                Номер получателя
                            </h3>
                            <InputMask value={user.phone} mask={`+\\9\\96(999)99-99-99`} className='order__tel-input' placeholder='+996 ___-__-__-__' />
                        </div>

                    </div>
                </div>
            </div>
        </section >
    )
}

export default Order