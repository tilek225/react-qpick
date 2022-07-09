import React from 'react'
import Rating from '@mui/material/Rating'
import './review.scss'


const Review = ({ item, value }) => {
    return (
        <div className='review'>
            <h3 className='review__user'>{item.user}</h3>
            <Rating name="read-only" value={value} precision={0.5} readOnly />
            <p className='review__comment'>{item.comment}</p>

        </div>
    )
}

export default Review