import React from 'react'
import ProductList from '../components/order/productsList/ProductList'
import CheckOut from '../components/order/checkout/CheckOut'
import { useClothContext } from '../context/ClothContext'

function Order() {
  const { currentUser } = useClothContext()
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <ProductList currentUser={currentUser} />
      <CheckOut />
    </div>
  )
}

export default Order  