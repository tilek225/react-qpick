import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import Card from './Card'
import CardList from './CardList'
import './products.scss'

const Products = () => {
    return (
        <section className='products'>
            <div className='container'>
                <div className='products__inner'>
                    <CardList type='headphone' />
                    <CardList type='wireless' />
                    <CardList type='case' />
                    <CardList type='charger' />
                </div>
            </div>
        </section>
    )
}

export default Products