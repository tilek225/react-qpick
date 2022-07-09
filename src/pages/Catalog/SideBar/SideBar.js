import React from 'react'
import './sidebar.scss'

const SideBar = ({
    handleSearch,
    handleType,
    type,
    handleSort,
    sort
}) => {
    return (
        <div className='sidebar'>
            <input
                type='text'
                placeholder="Search..."
                className='sidebar__input'
                onChange={(event) => {
                    handleSearch(event.target.value)
                }}
            />
            <div className='sidebar__filter'>
                <h3 className='sidebar__sort-title'>Тип</h3>
                <button
                    className='sidebar__filter-btn '
                    onClick={() => handleType('')}
                >
                    <h3
                        className={type === '' ? 'sidebar__filter-active' : 'sidebar__filter-item'}>
                        All
                    </h3>
                </button>
                <button type='button'
                    className='sidebar__filter-btn '
                    onClick={() => handleType('headphone')}>
                    <h3
                        className={type === 'headphone' ? 'sidebar__filter-active' : 'sidebar__filter-item'}>
                        Headphone
                    </h3>
                </button>
                <button type='button'
                    className='sidebar__filter-btn'
                    onClick={() => handleType('wireless')}>
                    <h3
                        className={type === 'wireless' ? 'sidebar__filter-active' : 'sidebar__filter-item'}>
                        Wireless
                    </h3>
                </button>
                <button type='button'
                    className='sidebar__filter-btn'
                    onClick={() => handleType('case')}>
                    <h3
                        className={type === 'case' ? 'sidebar__filter-active' : 'sidebar__filter-item'}>
                        Case
                    </h3>
                </button>
                <button type='button'
                    className='sidebar__filter-btn'
                    onClick={() => handleType('charger')}>
                    <h3
                        className={type === 'charger' ? 'sidebar__filter-active' : 'sidebar__filter-item'}>
                        Charger
                    </h3>
                </button>
            </div>
            <div className='sidebar__sort'>
                <h3 className='sidebar__sort-title'>Цена</h3>
                <button
                    className={sort === 'big' ? 'sidebar__sort-active' : 'sidebar__sort-btn'}
                    onClick={() => handleSort('big')}>
                    По возрастанию
                </button>
                <button
                    className={sort === 'less' ? 'sidebar__sort-active' : 'sidebar__sort-btn'}
                    onClick={() => handleSort('less')}>
                    К убыванию
                </button>
            </div>

        </div>
    )
}

export default SideBar