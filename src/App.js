import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase/firebase';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts } from './redux/reducers/products';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Layout from './layout/Layout';
import Login from './pages/Login/Login';
import ProductPage from './pages/Home/ProductPage/ProductPage';
import Favorites from './pages/Favorites/Favorites';
import Register from './pages/Register/Register';
import { findUser } from './redux/reducers/user';
import Cart from './pages/Cart/Cart';
import { ToastContainer } from 'react-toastify'
import Order from './pages/Order/Order';
import Service from './pages/Service/Service';
import Contacts from './pages/Service/Contacts/Contacts';
import Profile from './pages/Profile/Profile';
import Catalog from './pages/Catalog/Catalog'
import AfterOrder from './pages/Order/AfterOrder';
import 'react-toastify/dist/ReactToastify.css'



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then((res) => dispatch(getAllProducts({ arr: res.docs.map(el => ({ ...el.data(), id: el.id })) })))
  }, [])

  useEffect(() => {
    localStorage.getItem('user') ?
      dispatch(findUser({ user: JSON.parse(localStorage.getItem('user')) })) : console.log('empty')
  }, [])

  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='product/:id' element={<ProductPage />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='cart' element={<Cart />} />
          <Route path='order' element={<Order />} />
          <Route path='user/:id' element={<Profile />} />
          <Route path='service' element={<Service />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='catalog/:id' element={<Catalog />} />
          <Route path='afterorder' element={<AfterOrder />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
