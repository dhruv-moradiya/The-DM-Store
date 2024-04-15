import React from 'react'
import styles from './productList.module.css'

function ProductCard() {
  return (

    <div className={styles.containerCard}>
      <div className={styles.imagePart}>
        <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/jeans_CzDyLTu.jpg?format=webp&w=480&dpr=1.3" alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.content_1}>
          <h3>Name</h3>
          <h3>Total</h3>
        </div>
        <div className={styles.content_2}>
          <p>Price</p>
          p
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aliquam, omnis cum nam illo error hic magnam dignissimos dolor nemo?
        </div>
        <div className={styles.content_3}>
          <select name="" id="">
            <option value="">Some</option>
            <option value="">Some</option>
            <option value="">Some</option>
            <option value="">Some</option>
          </select>
          <div className={styles.increment_decrement}>
            <p>+</p>
            <p>1</p>
            <p>-</p>
          </div>
          <button><i className="ri-delete-bin-5-fill"></i></button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard