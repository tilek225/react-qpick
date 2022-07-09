import React, { useState } from 'react'
import './catalog.scss'
import CatalogList from './CatalogList/CatalogList'
import SideBar from './SideBar/SideBar'

const Catalog = () => {
    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')
    const [sort, setSort] = useState('')

    return (
        <section className='catalog'>
            <div className='container'>
                <div className='catalog__inner'>
                    <div className='catalog__sidebar'>
                        <h2 className='catalog__title'>Каталог</h2>
                        <SideBar
                            handleSearch={setSearch}
                            handleType={setType}
                            type={type}
                            handleSort={setSort}
                            sort={sort}
                        />
                    </div>
                    <div className='catalog__list'>
                        <CatalogList
                            search={search}
                            type={type}
                            sort={sort}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Catalog