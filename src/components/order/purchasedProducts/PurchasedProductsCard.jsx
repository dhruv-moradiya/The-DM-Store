import React from 'react'
import styles from './purchasedProductsList.module.css'

function PurchasedProductsCard({ name, image, category, discount, price, quantity, size }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imagePart}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>Category: {category}</p>
        <div className={styles.price}>
          <p>Price: ₹{price}</p>
        </div>
        <div className={styles.discount}>
          <p>Discount: {discount}%</p>
        </div>
        <div className={styles.discount}>
          <p>Quntity: {quantity}</p>
        </div>
        <div>Size: <span>{size}</span></div>
      </div>
    </div>
  )
}

export default PurchasedProductsCard