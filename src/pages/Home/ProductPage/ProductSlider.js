import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from 'react-router-dom'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './slider.scss'
import { Autoplay, Navigation } from "swiper";
import Card from '../Products/Card';
import { useSelector } from 'react-redux'


const ProductSlider = ({ product }) => {
    const products = useSelector(store => store.products.products)
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {
                    products.filter(item => item.type.includes(product.type)).map((item) => (
                        <SwiperSlide key={item.id} >
                            <Card item={item} />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default ProductSlider