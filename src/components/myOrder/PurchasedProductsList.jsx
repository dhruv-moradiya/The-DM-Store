import React from "react";
import styles from "./purchasedProductsList.module.css";
import PurchasedProductsCard from "./PurchasedProductsCard";
import { useClothContext } from "../../context/ClothContext";

function PurchasedProductsList({ orderData, currentUser }) {

  if (!orderData) return null;
  return (
    <div className={styles.container}>
      <h3>😍 {currentUser.displayName}'s Orders 😍</h3>
      <div className={styles.orderInfo}>
        <div>
          <h4>Order ID:</h4>
          <p>{orderData[0]?.id}</p>
        </div>
        <div>
          <h4>Address:</h4>
          <p>
            {orderData[0]?.addressInfo.address}, {orderData[0]?.addressInfo.city},
            {orderData[0]?.addressInfo.state}
          </p>
        </div>
        <div>
          <h4>Pincode:</h4>
          <p>{orderData[0]?.addressInfo.pincode}</p>
        </div>
        <div>
          <h4>Order Date:</h4>
          <p>{orderData[0]?.date}</p>
        </div>
        <div>
          <h4>Phone no:</h4>
          <p>{orderData[0]?.addressInfo.phoneNumber}</p>
        </div>
      </div>
      <div className={styles.cardList}>
        {orderData[0]?.cartItems.map((item, index) => {
          return (
            <PurchasedProductsCard
              key={index}
              name={item.name}
              image={item.imageURL1}
              category={item.category}
              discount={item.discount}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PurchasedProductsList;
