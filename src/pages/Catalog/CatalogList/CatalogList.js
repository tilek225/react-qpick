import Card from '../../Home/Products/Card'
import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import './cataloglist.scss'

const CatalogList = ({ search, type, sort }) => {
    const parId = useParams()
    const products = useSelector(store => store.products.products)
    return (
        <div className='list'>
            {
                products
                    .filter(item => item.title.toLowerCase().includes(parId.id.toLowerCase()))
                    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
                    .filter(item => {
                        switch (type) {
                            case 'headphone':
                                return item.type === type
                            case 'wireless':
                                return item.type === type
                            case 'case':
                                return item.type === type
                            case 'charger':
                                return item.type === type
                            default:
                                return item
                        }
                    })
                    .sort((a, b) => {
                        if (sort === 'big') {
                            return b.price - a.price
                        } else if (sort === 'less') {
                            return a.price - b.price
                        }
                        return 0
                    })
                    .map(item => {
                        return <Card item={item} key={item.id} />
                    })
            }
        </div>
    )
}

export default CatalogList