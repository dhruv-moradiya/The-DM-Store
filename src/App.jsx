import { useEffect, useState } from 'react'
import './App.css'
import Home from './page/Home'
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import CategoryProducts from './page/categoryProducts/CategoryProducts'
import AdminLayout from './adminLayout/AdminLayout'
import Admin from './page/admin/adminPage/Admin'
import Users from './page/admin/users/Users'
import Products from './page/admin/products/Products'
import LoginPage from './components/register/login/LoginPage'
import SignUp from './components/register/signup/SignUp'
import { useClothContext } from './context/ClothContext'
import ProductDetail from './page/ProductDetail'
import LikedProducts from './page/LikedProducts'
import Order from './page/Order'
import MyOrder from './page/MyOrder'

function ProtectedRoute({ user, children }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return user ? children : null;
}

function ProtectedRouteAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem('DMStore_User'))
  if (user.email === import.meta.env.VITE_APP_ADMIN_EMAIL_NAME) {
    return children
  } else {
    <Navigate to={"/login"} />;
  }
}

function App() {
  const { currentUser } = useClothContext()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ProtectedRoute user={currentUser}><Home /></ProtectedRoute>} />
            <Route path='/:category' element={<CategoryProducts />} />
            <Route path='/:category/:productID' element={<ProductDetail />} />
            <Route path='/likedProducts' element={<LikedProducts />} />
            <Route path='/order' element={<Order />} />
            <Route path='/myorder' element={<MyOrder />} />
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path='/admin/users' element={<Users />} />
              <Route path='/admin/products' element={<Products />} />
            </Route>
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
