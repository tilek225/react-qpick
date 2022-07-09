import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db } from '../../../firebase/firebase'
import { findUser } from '../../../redux/reducers/user'
import { getDocs, collection } from 'firebase/firestore'
import './personaldata.scss'


const PersonalData = () => {
    const user = useSelector(store => store.user.user)
    const dispatch = useDispatch()

    return (
        <div>
            {
                user.email && (
                    <div className='data'>
                        <h3 className='data__title'>Личные данные</h3>
                        <div className='data__inner'>
                            <div className='data__info'>
                                <p className='data__span'>Логин</p>
                                <p>{user.login}</p>
                            </div>
                            <div className='data__info'>
                                <p className='data__span'>Электронная почта</p>
                                <p>{user.email}</p>
                            </div>
                            <div className='data__info'>
                                <p className='data__span'>Телефон</p>
                                <p>{user.phone}</p>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default PersonalData