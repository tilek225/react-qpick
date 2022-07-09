import React from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { findUser } from '../../redux/reducers/user'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase/firebase'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError: {
            errors
        },
        reset
    } = useForm()


    const loginUser = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await getDocs(collection(db, 'users'))
                    .then(async (res) => {
                        await dispatch(findUser({ user: res.docs.map(el => ({ ...el.data(), id: el.id })).find(item => item.email === user.email) }));
                        await localStorage.setItem('user', JSON.stringify(res.docs.map(el => ({ ...el.data(), id: el.id })).find(item => item.email === user.email)));
                        await reset();
                        await navigate('/')
                    })
            })
            .catch((error) => console.log(`bad request ${error}`));
    }


    return (
        <section className='login'>
            <form className='login__form' onSubmit={handleSubmit(loginUser)}>
                <h1 className='login__title'>Login</h1>
                <label>Email</label>
                <input id='1' {...register('email')} className='login__input' type='email' placeholder='Email' />
                <label>Password</label>
                <input id='2' {...register('password')} className='login__input' type='password' placeholder='Enter Password' />
                <button className='login__btn' type='submit'>Login</button>
                <p className='login__quest'>Нет аккаунта ? <Link to='/register' >Регистрация</Link></p>
                <Link to='/'>Вернуться на главную </Link>

            </form>
        </section>
    )
}

export default Login