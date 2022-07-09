import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import './register.scss'
import InputMask from 'react-input-mask'
import * as Fa from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { useDispatch } from 'react-redux'
import { findUser } from '../../redux/reducers/user'
import { addDoc, collection } from '@firebase/firestore'


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        watch,
        reset
    } = useForm({
        mode: 'onBlur'
    })
    const password = useRef({})
    password.current = watch("password", "")

    const createUser = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password, data.phoneNumber)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await addDoc(collection(db, 'users'), { email: data.email, phone: data.phone, orders: [], favorites: [], login: data.login, id: user.uid })

                await dispatch(findUser({ user: { email: data.email, phone: data.phone, orders: [], favorites: [], login: data.login, id: user.uid } }));
                await localStorage.setItem('user', JSON.stringify({ email: data.email, phone: data.phone, orders: [], favorites: [], login: data.login, id: user.uid }));
                await reset();
                await navigate('/')
            })
            .catch((error) => console.log(`bad request ${error}`));
    }

    return (
        <section className='register'>
            <form className='register__form' onSubmit={handleSubmit(createUser)}>
                <h2 className='register__title'>Register</h2>
                <label className='register__label'>Email</label>
                <input
                    {...register('email', { required: 'Это поле обязательное *' })}
                    className='register__input' type='email' placeholder='Enter email'
                />
                <span>{errors?.email?.message}</span>

                <label className='register__label' htmlFor="2">Login</label>
                <input id='2' {...register('login', {
                    required: 'Это поле обязательное *'
                })} className='register__input' type="text" placeholder='Enter login' />
                <span>{errors?.login?.message}</span>


                <label className='register__label' htmlFor="tel">Phone</label>
                <InputMask mask={`+\\9\\96(999)99-99-99`} type='tel' id='tel' {...register('phone', {
                    required: 'Это поле обязательное *'
                })} className="register__input" placeholder='Enter your phone' />
                <span>{errors?.phone?.message}</span>


                <label className='register__label' htmlFor="4">Password</label>
                <input id='4' {...register('password', {
                    required: "You must specify password",
                    minLength: {
                        value: 5,
                        message: "Password must have at least 5 characters"
                    }
                })} className="register__input" type='password' placeholder='Enter password' />
                <span>{errors?.password?.message}</span>


                <label className='register__label' htmlFor="5">Confirm Password</label>
                <input id='5' className="register__input" type='password' placeholder='Confirm password' {...register('confirmPwd', {
                    validate: value =>
                        value === password.current || "The password do not match"
                })} />
                {errors?.confirmPwd && <p>{errors?.confirmPwd?.message}</p>}


                <button className='register__btn' type='submit'>Register</button>
                <p className='register__quest'>Allready have account ? <Link to='/login'>Login</Link></p>
                <Link to='/'>Go to Home</Link>



            </form>
        </section>
    )
}

export default Register