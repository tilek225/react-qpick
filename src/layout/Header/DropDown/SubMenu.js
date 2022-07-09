import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SubMenu = ({ item }) => {
    const [subMenu, setSubMenu] = useState(false)
    const showSubmenu = () => setSubMenu(!subMenu)
    return (
        <>
            <Link to={`/catalog/${item.path}`} onClick={showSubmenu} className='dropdown__submenu' style={{ color: 'black' }}>
                <div>
                    <span className='dropdown__content-title'>{item.title}</span>

                </div>
            </Link>

        </>
    )
}

export default SubMenu