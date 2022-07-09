import React from 'react'
import { Link } from 'react-router-dom'
import * as Fa from 'react-icons/fa'
import './footer.scss'
import NavList from '../NavList'

const Footer = () => {
    return (
        <section className='footer'>
            <div className='container'>
                <div className='footer__inner'>
                    <h1>QPICK</h1>
                    <NavList />
                    <div className='footer__social'>
                        <div>
                            <Fa.FaVk size={25} />

                        </div>
                        <div>
                            <Fa.FaInstagram size={25} />

                        </div>
                        <div>
                            <Fa.FaTelegram size={25} />

                        </div>
                        <div>
                            <Fa.FaWhatsapp size={25} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer