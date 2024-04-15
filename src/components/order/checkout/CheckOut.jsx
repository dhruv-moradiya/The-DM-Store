import React from 'react'
import styles from './checkOut.module.css'

function CheckOut() {
  return (
    <div className={styles.container}>
      <h3>Delivery</h3>
      <form>
        <input type="text" placeholder='Name' />
        <input type="text" placeholder='Aderess' />
        <input type="text" placeholder='City' />
        <input type="text" placeholder='State' />
        <input type="tel" placeholder='Phone No.' />
        <input type="email" placeholder='Email' />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Subtotal: </th>
              <th>₹2000</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Discount: </td>
              <td>₹120</td>
            </tr>
            <tr>
              <td>Dilivert: </td>
              <td>₹0</td>
            </tr>
            <tr>
              <td>Tax: </td>
              <td>₹30</td>
            </tr>
            <tr className={styles.total}>
              <td>Total: </td>
              <td>₹1800</td>
            </tr>
          </tbody>
        </table>

        <button>Proceed to checkout</button>
        <button>Continue Shopping</button>
      </form>

    </div>
  )
}

export default CheckOut