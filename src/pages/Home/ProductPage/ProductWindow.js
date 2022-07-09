import React, { useState } from 'react'
import * as Md from 'react-icons/md'
import BtnFavorites from '../../BtnFavorites/BtnFavorites'


const ProductWindow = ({ product }) => {
    return (
        <div className='product__window'>
            <div className='product__window-fav'>
                <BtnFavorites item={product} />
            </div>
            <div className='product__img'>
                <img src={product.image} />
            </div>
            <div className='product__content'>
                <h3 className='product__content-title'>{product.title}</h3>
                <p className='product__price'>
                    {product.price} сом
                </p>
            </div>

        </div>
    )
}

export default ProductWindow