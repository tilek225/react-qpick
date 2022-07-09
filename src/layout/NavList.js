import React from 'react'
import { NavLink } from 'react-router-dom'

const NavList = () => {
    return (
        <div className='footer__list'>
            <NavLink style={{ color: 'black' }} to='/contacts'>Контакты</NavLink>
            <NavLink style={{ color: 'black' }} to='/service'>Условия сервиса</NavLink>
        </div>
    )
}

export default NavList