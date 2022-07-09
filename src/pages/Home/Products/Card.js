import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnFavorites from '../../BtnFavorites/BtnFavorites'

const Card = ({ item }) => {
    const user = useSelector(s => s.user.user)
    return (
        <div className='products__card'>
            <div className='products__favorite'>
                {
                    user.email?.length || user.phoneNumber?.length ?
                        <BtnFavorites product={true} item={item} />
                        : ''
                }
            </div>
            <div className='products__img'>
                <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt='img' width='219 .61' height='237.45' />

                </Link>

            </div>
            <div className='products__card-title'>
                <h3>{item.title.length > 15 ? `${item.title.slice(0, 20)}...` : item.title}</h3>


                <h3 className='products__card-price'>
                    <span className='products__card-none'>{item.price} сом</span>
                </h3>



            </div>
            <div className='products__rate'>
                <div>
                    <span>
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.627 18.2497L5.41636 22.6079L7.37665 14.4742L0.960938 9.03564L9.38233 8.36796L12.627 0.647087L15.8716 8.36796L24.2943 9.03564L17.8773 14.4742L19.8376 22.6079L12.627 18.2497Z" fill="#FFCE7F" />
                        </svg>

                    </span>
                </div>
                <div>
                    {
                        // item.calculatedRate === NaN && item.calculatedRate !== true ? 'Отзывов нет' : item.calculatedRate
                        item.calculatedRate?.includes(NaN) ? 'Отзывов нет' : item.calculatedRate
                    }
                </div>
            </div>

        </div>
    )
}

export default Card