import React from 'react'
import './hero.scss'
import bg from './bg.png'

const Hero = () => {
    return (
        <section className='hero'>
            <div className='container'>
                <div className='hero__inner'>
                    <div className='hero__title'>
                        <h2>Аксессуары для <br />
                            iPhone 13 Pro Max</h2>
                    </div>
                    <div className='hero__image'>
                        <img src={bg} alt='iphone' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero