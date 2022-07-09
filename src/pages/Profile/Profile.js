import React, { useEffect, useState } from 'react'
import PersonalData from './PersonalData/PersonalData'
import OrderHistory from './OrderHistory/OrderHistory'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { findUser } from '../../redux/reducers/user'
import './profile.scss'



const Profile = () => {
    const [tab, setTab] = useState('data')
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    console.log(user);

    return (
        <section className='profile'>
            <div className='container'>
                <h2 className='profile__title'>Мой аккаунт</h2>
                <div className='profile__btns'>
                    <button className={tab === 'data' ? 'profile__btn-active' : 'profile__btn'} onClick={() => setTab('data')}>Персональные данные</button>
                    <button className={tab === 'history' ? 'profile__btn-active' : 'profile__btn'} onClick={() => setTab('history')}>История заказов</button>
                </div>
                {
                    tab === 'data' && <PersonalData />
                }

                {
                    tab === 'history' && <OrderHistory />
                }
            </div>
        </section>
    )
}

export default Profile