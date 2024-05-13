import React from 'react'
import styles from './howMany.module.css'

function Howmany({ orderData }) {

  const sale = orderData?.reduce((a, b) => a + Number(b.total), 0)
  return (
    <div className={styles.container}>
      <h2><i className="ri-hand"></i>Hello Admin</h2>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <i className="ri-price-tag-3-fill"></i>
          <h4>Sale</h4>
          <p>₹{Math.round(sale).toLocaleString("en-IN")}</p>
        </div>
        <div className={styles.box}>
          <i className="ri-price-tag-2-fill"></i>
          <h3>Order</h3>
          <p>{orderData?.length}</p>
        </div>
        <div className={styles.box}>
          <i className="ri-user-smile-fill"></i>
          <h3>User</h3>
          <p>1,00,000</p>
        </div>
      </div>
    </div>
  )
}

export default Howmany