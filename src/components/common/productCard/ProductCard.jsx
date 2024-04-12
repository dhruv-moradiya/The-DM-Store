import React from 'react'
import styles from './productCard.module.css'

function ProductCard({ image, name, price, category }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img src={image} alt="Product" />
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{category}</p>
        <p>₹&nbsp;&nbsp;{price}</p>
        <p>MRP incl. if all taxes</p>
      </div>
    </div>
  )
}

export default ProductCard