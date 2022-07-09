import React from 'react'
import { Link } from 'react-router-dom'
import './order.scss'

const AfterOrder = () => {
    const _id = Math.floor((Math.random() * 10000) + 1)
    return (
        <section className='after'>
            <div className='container'>
                <div className='after__outer'>
                    <div className='after__inner'>
                        <h2 className='after__title'>Номер вашего заказа №{_id}, с Вами свяжется наш менеджер.</h2>
                    </div>
                    <Link to='/'><button className='cart__empty-btn'>В каталог товаров</button></Link>
                </div>
            </div>
        </section>
    )
}

export default AfterOrder