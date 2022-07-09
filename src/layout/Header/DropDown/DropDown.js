import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './dropdown.scss'
import * as Md from 'react-icons/md'
import { DropDownData } from './DropDownData'
import SubMenu from './SubMenu'

const DropDown = () => {
    const [dropdown, setDropdown] = useState(false)
    const showDropdown = () => setDropdown(!dropdown)

    return (
        <div className='dropdown'>

            <div className={`burger ${dropdown ? 'burger_active' : ''}`} onClick={showDropdown}>
                <span className='burger__line'>

                </span>

            </div>

            <div className='drop'>
                <Link to='#' className='dropdown__choose' style={{ color: 'black' }}>
                    <span className='dropdown__choose-title'>Выбрать модель телефона</span>
                    {dropdown ? <Md.MdKeyboardArrowUp onClick={showDropdown} />
                        : <Md.MdKeyboardArrowDown onClick={showDropdown} />
                    }
                </Link>
            </div>

            <div className='dropdown__content' style={{ background: dropdown ? '#EAEAEA' : 'transparent' }}>
                {dropdown ? (
                    DropDownData.map((item, idx) => {
                        return <SubMenu key={idx} item={item} />
                    })
                ) : ''
                }
            </div>

        </div >
    )
}

export default DropDown

