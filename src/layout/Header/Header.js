import React from 'react'
import DropDown from './DropDown/DropDown'
import './header.scss'
import * as Md from 'react-icons/md'
import NavList from '../NavList'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../redux/reducers/user'



const Header = () => {
    const user = useSelector(store => store.user.user)
    const { cartTotalQuantity } = useSelector(store => store.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <section className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__left'>
                        <h1 className='header__title'>
                            <Link style={{ color: 'black' }} to="/" >QPICK</Link>
                        </h1>
                        <DropDown />
                    </div>
                    <div className='header__right '>
                        <NavList />

                        <div className='header__auth'>
                            <Md.MdAccountCircle size={25} />
                            &nbsp;
                            {
                                user.email?.length || user.phone?.length ?
                                    <p>
                                        <Link to={`/user/${user.id}`} style={{ color: 'black' }}>
                                            <span>{user.login}</span>
                                        </Link>
                                        &nbsp;
                                        <Link to='/login'
                                            style={{ color: 'black' }}
                                            onClick={() => {
                                                if (window.confirm('Log out')) {
                                                    dispatch(logOutUser());
                                                    localStorage.removeItem('user')

                                                } return
                                            }}
                                        >выйти</Link>
                                    </p>
                                    : <p><Link to='/login' style={{ color: 'black' }}>Вход</Link></p>
                            }
                        </div>


                        <div className='header__favorite header__icon'>
                            <Link to='/favorites' style={{ color: 'black' }}>
                                <Md.MdFavoriteBorder size={25} />
                            </Link>
                            {
                                user.favorites?.length === 0 ? '' :
                                    <span className='header__count'>{user.favorites?.length}</span>

                            }
                        </div>

                        <div className='header__cart header__icon'>
                            <Link to='/cart' style={{ color: 'black' }}>
                                <Md.MdOutlineShoppingCart size={25} />
                            </Link>
                            {
                                cartTotalQuantity === 0 ? ''
                                    : <span className='header__count'>{cartTotalQuantity}</span>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Header