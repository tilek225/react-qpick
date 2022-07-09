import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CardList = ({ type }) => {
    const products = useSelector(store => store.products.products)
    return (
        <>
            <h1 className='products__title'>{products.filter(item => item.type === type).map(item => item.type).shift()}</h1>
            <div className='products__cards'>
                {
                    products.filter(item => item.type === type).map(item => (
                        <Card item={item} key={item.id} />
                    ))
                }
            </div>
        </>

    )
}

export default CardList