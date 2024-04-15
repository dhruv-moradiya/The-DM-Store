import React from 'react'
import ProductList from '../components/order/productsList/ProductList'
import CheckOut from '../components/order/checkout/CheckOut'

function Order() {
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <ProductList />
      <CheckOut />
    </div>
  )
}

export default Order  