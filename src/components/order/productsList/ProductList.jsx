import React from 'react'
import styles from './productList.module.css'
import ProductCard from './ProductCard'

function ProductList() {
  return (
    <div className={styles.container}>
      <h2>Hi User Name</h2>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default ProductList