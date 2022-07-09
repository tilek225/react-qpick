import React from 'react'
import './contacts.scss'
import * as Fa from 'react-icons/fa'

const Contacts = () => {
    return (
        <section className='contacts'>
            <div className='container'>
                <div className='contacts__inner'>
                    <div className='contacts__left'>
                        <div className='contacts__info'>
                            <h3 className='contacts__info-title'>Наш офис</h3>
                            <div className='contacts__map'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.7085288302405!2d74.59343961574642!3d42.87899581016328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb73ef59391dd%3A0xd9a25f1216632551!2zSVQtUlVOIC0g0LDQutCw0LTQtdC80LjRjyDQv9GA0L7Qs9GA0LDQvNC80LjRgNC-0LLQsNC90LjRjyDQvNC10LbQtNGD0L3QsNGA0L7QtNC90L7Qs9C-INGB0YLQsNC90LTQsNGA0YLQsA!5e0!3m2!1sen!2skg!4v1655889044763!5m2!1sen!2skg"
                                    width="772" height="424" className='contacts__map' style={{ border: '0', borderRadius: '10px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">

                                </iframe>
                            </div>
                            <div className='contacts__adress'>
                                <p>
                                    <Fa.FaMapMarkerAlt size={20} />
                                    Аксай-3а, 62ф, Алматы, Казахстан
                                    <br />
                                    <span>3 этаж 35 кабинет</span>
                                </p>
                            </div>
                        </div>
                        <div className='contacts__tel'>
                            <Fa.FaPhoneAlt size={30} />
                            <h3>+996 777 777 777</h3>
                        </div>
                    </div>
                    <div className='contacts__right'>
                        <div className='contacts__right-item'>
                            <Fa.FaWhatsapp size={65} />
                        </div>
                        <div className='contacts__right-item'>
                            <Fa.FaVk size={65} />
                        </div>
                        <div className='contacts__right-item'>
                            <Fa.FaInstagram size={65} />
                        </div>
                        <div className='contacts__right-item'>
                            <Fa.FaTelegram size={65} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts