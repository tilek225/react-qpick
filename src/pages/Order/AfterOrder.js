import React from 'react'
import { useSelector } from 'react-redux'
import './order.scss'

const AfterOrder = () => {
    const user = useSelector(store => store.user.user)
    return (
        <section className='after'>
            <div className='container'>
                <div className='after__inner'>
                    <h2 className='after__title'>Номер вашего заказа №{user.id}, с Вами свяжется наш менеджер.</h2>
                </div>
            </div>
        </section>
    )
}

export default AfterOrder