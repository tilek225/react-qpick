import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Home/Products/Card'

import './favorites.scss'

const Favorites = () => {
    const favorites = useSelector(s => s.user.user.favorites)
    return (
        <section className='favorites'>
            <div className='container'>
                <div className='favorites__inner'>
                    <h2 className='favorites__title'>Избранное</h2>
                    <div className='favorites__content'>
                        {
                            favorites?.length ? favorites.map((item => {
                                return (
                                    <Card item={item} key={item.id} />
                                )
                            })) : <p className='favorites__info'>Your favorites list is empty !</p>
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Favorites