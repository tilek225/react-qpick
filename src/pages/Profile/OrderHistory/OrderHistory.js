import React, { useEffect } from 'react'
import HistoryCard from './HistoryCard'
import { useSelector, useDispatch } from 'react-redux'
import { db } from '../../../firebase/firebase'
import { findUser } from '../../../redux/reducers/user'
import { getDocs, collection } from 'firebase/firestore'
import './orderhistory.scss'

const OrderHistory = () => {
    const user = useSelector(store => store.user.user)
    const dispatch = useDispatch()

    return (
        <div className='history'>
            <h3 className='history__title'>История заказов</h3>
            <div className='history__card-top'>
                <p className='history__card-text'>Order id</p>
                <p className='history__card-text'>Title</p>
                <p className='history__card-text'>Quantity</p>
                <p className='history__card-text'>Price</p>
            </div>
            {user.orders?.length ? user.orders?.map((item, idx) => {
                return (
                    <div key={idx} className='history__cards'>

                        {item.carts.map(item => {
                            return (
                                <div key={item.id}>

                                    <HistoryCard item={item} />
                                </div>
                            )
                        })}
                    </div>
                )

            })
                : <p>your history is empty</p>
            }
        </div>
    )
}

export default OrderHistory