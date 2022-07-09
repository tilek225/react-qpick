import React, { useEffect, useState } from 'react'
import { useParams, useResolvedPath } from 'react-router-dom'
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/reducers/product';
import './productspage.scss'
import ProductWindow from './ProductWindow';
import ProductSlider from './ProductSlider';
import { addToCart } from '../../../redux/reducers/cart';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import Review from './Reviews/Review';
import Rating from '@mui/material/Rating'



const ProductPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const parId = params.id
    const user = useSelector(store => store.user.user)
    const product = useSelector(store => store.product.product)


    const [value, setValue] = useState(0)
    const [sort, setSort] = useState('')

    const {
        register,
        handleSubmit,
        setError: {
            errors
        },
        reset
    } = useForm()


    const addCommentForProduct = (obj) => {
        getDocs(collection(db, 'products'))
            .then(async (res) => {
                await updateDoc(doc(db, 'products', product.id), obj)
                await dispatch(getProduct({ arr: obj }));
                await localStorage.setItem('product', JSON.stringify(product));
            })
    }

    const calculatedRate = (product.reviews?.map(item => item.rate)
        .reduce((acc, rec) => acc + rec, 0)
        / product.reviews?.map(item => item.rate).length).toFixed(1);

    const addCommentHandler = async (data) => {
        const comment = data.comment
        await addCommentForProduct({
            ...product, reviews: [
                ...product.reviews,
                {
                    comment,
                    rate: value,
                    user: user.login
                }
            ]
        });
        await toast.success('Review added', {
            position: "bottom-left"
        })
        await reset()
    }

    useEffect(() => {
        getDocs(collection(db, 'products'))
            .then(async (res) => {
                await updateDoc(doc(db, 'products', product.id), { calculatedRate })
                await console.log(getProduct({ arr: product, [product.rate]: calculatedRate }));
                await localStorage.setItem('product', JSON.stringify(product));
            })
    }, [addCommentHandler])



    useEffect(() => {
        getDocs(collection(db, 'products'))
            .then((res) => dispatch(getProduct({
                arr: res.docs.map(el => ({ ...el.data(), id: el.id }))
                    .filter(item => item.id === parId)[0]
            })))
    }, [])

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    return (
        <section className='product'>
            <div className='container'>
                <div className='product__inner'>
                    <div className=''>
                        <ProductWindow product={product} />
                        <button className='product__btn' onClick={() => handleAddToCart(product)}>Добавить в корзину</button>
                    </div>


                    <div className='product__btns'>
                    </div>


                    <div className='product__slider'>
                        <h2 className='product__title'>Похожие товары</h2>
                        <ProductSlider product={product} />
                    </div>

                    <div className='product__review'>
                        <h2 className='product__title'>Отзывы {`(${product.reviews?.length ? product.reviews.length : '0'})`}</h2>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <form onSubmit={handleSubmit(addCommentHandler)} className='product__form'>
                            <textarea id='1' {...register('comment')} className='product__textarea'></textarea>
                            <button className='product__btn' type='submit'>Add Review</button>
                        </form>
                        {
                            product.reviews?.length && (
                                <div className='product__review-btns'>
                                    <button onClick={() => setSort('big')} className={sort === 'big' ? 'product__btn-sort' : 'product__noactive'}>
                                        К большему
                                    </button>
                                    <button onClick={() => setSort('less')} className={sort === 'less' ? 'product__btn-sort' : 'product__noactive'}>
                                        К меньшему
                                    </button>
                                </div>
                            )
                        }


                        <div>
                            {product.reviews?.length !== 0 ?
                                product.reviews?.map(item => item).sort((a, b) => {
                                    if (sort === 'big') {
                                        return b.rate - a.rate
                                    } else if (sort === 'less') {
                                        return a.rate - b.rate
                                    }
                                }).map((item, idx) => {
                                    return (
                                        <Review
                                            value={item.rate}
                                            key={idx}
                                            item={item}
                                        />
                                    )
                                })
                                : product.calculatedRate === NaN ? ' Отзывов нет' : 'Отзывов нет'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage