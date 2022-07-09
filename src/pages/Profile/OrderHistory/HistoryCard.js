import React from 'react'
import { useSelector } from 'react-redux'

const HistoryCard = ({ item }) => {
    const _id = item.id.slice(0, 10)
    const user = useSelector(store => store.user.user)
    return (
        <div className='history__card'>
            <hr />
            <div className='history__card-bottom'>
                <div className='history__card-info'>
                    <p>{_id}</p>
                </div>
                <div className='history__card-info'>
                    <p>{item.title}</p>
                </div>
                <div className='history__card-info'>
                    <p>{item.cartQuantity}</p>
                </div>
                <div className='history__card-info'>
                    <p>{item.price} сом</p>
                </div>
            </div>

        </div>
    )
}

export default HistoryCard