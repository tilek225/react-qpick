import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../firebase/firebase';
import { findUser } from '../../redux/reducers/user';
import * as Md from "react-icons/md";
import { toast } from 'react-toastify';

const BtnFavorites = ({ item, product }) => {
    const user = useSelector(store => store.user.user)
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false)
    const showFavorite = () => setFavorite(!favorite)

    const addFavoritesForUser = (obj) => {
        getDocs(collection(db, 'users'))
            .then(async (res) => {
                await dispatch(findUser({ user: obj }));
                await localStorage.setItem('user', JSON.stringify(obj));
                await updateDoc(doc(db, 'users', res.docs.map(el => ({ ...el.data(), id: el.id })).find(item => item.email === user.email).id), obj)
            })
    }
    return (
        <>
            <button className='products__favorite'
                onClick={() => {
                    addFavoritesForUser({
                        ...user,
                        favorites: user.favorites.findIndex(el => el.id === item.id) >= 0
                            ? user.favorites.filter((el) => el.id !== item.id)
                            : [...user.favorites, item]
                    })
                }}>
                {
                    user.favorites?.findIndex(el => el.id === item.id) >= 0 ? <Md.MdFavorite onClick={() => {
                        showFavorite()
                        toast.error(`Deleted from favorite`)
                    }} size={30} />
                        : <Md.MdFavoriteBorder onClick={() => {
                            showFavorite()
                            toast.success('Added to favorite')
                        }} size={30} />
                }
            </button>
        </>
    )
}

export default BtnFavorites