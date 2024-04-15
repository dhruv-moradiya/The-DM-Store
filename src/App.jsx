import { useEffect, useState } from 'react'
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
  if (user.email === 'gojo@gmail.com') {
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
