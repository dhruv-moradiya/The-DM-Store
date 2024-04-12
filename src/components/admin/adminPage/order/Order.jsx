import React from "react";
import styles from "./order.module.css";

function Order() {
  return (
    <div className={styles.container}>
      <h3><i className="ri-price-tag-2-fill" />Order</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product name</th>
            <th>User name</th>
            <th>Phone no</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Payment Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>F.R.I.E.N.D.S: Doodle Fusion</td>
            <td>Dhruv</td>
            <td>+91 99002 25648</td>
            <td>dhruv@gmail.com</td>
            <td>10</td>
            <td>₹300</td>
            <td>10%</td>
            <td>₹3900.98</td>
            <td>Paid</td>
            <td>October 25, 2021</td>
          </tr>
          <tr>
            <td>F.R.I.E.N.D.S: Doodle Fusion</td>
            <td>Dhruv</td>
            <td>+91 99002 25648</td>
            <td>dhruv@gmail.com</td>
            <td>10</td>
            <td>₹300</td>
            <td>10%</td>
            <td>₹3900.98</td>
            <td>Pending [COD]</td>
            <td>October 25, 2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Order;
