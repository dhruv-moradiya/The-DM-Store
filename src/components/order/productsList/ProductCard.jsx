import React, { useState } from "react";
import styles from "./productList.module.css";
import {
  FieldValue,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../context/Firebase";
import { useClothContext } from "../../../context/ClothContext";

function ProductCard({
  quantity,
  src,
  name,
  category,
  size,
  price,
  discount,
  orderID,
}) {
  const { currentUser, getCartItems } = useClothContext();
  const total = ((price * (100 - discount)) / 100) * quantity;

  const userRef = doc(db, "users", currentUser.uid);
  const cartRef = collection(userRef, "cartItems");

  async function deleteCartItem() {
    try {
      await deleteDoc(doc(cartRef, orderID));
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateQuantity(type) {
    const itemRef = doc(cartRef, orderID);
    try {
      const docSnap = await getDoc(itemRef);
      if (docSnap.exists() && docSnap.data().quantity > 0) {
        let newQuantity;

        if (type === "add") {
          newQuantity = docSnap.data().quantity + 1;
        } else if (type === "remove") {
          newQuantity = Math.max(1, docSnap.data().quantity - 1);
        }

        await updateDoc(itemRef, { quantity: newQuantity });

        getCartItems();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function decreaseQuantity() { }

  return (
    <div className={styles.containerCard}>
      <div className={styles.imagePart}>
        <img src={src} alt={name} />
      </div>
      <div className={styles.content}>
        <div className={styles.content_1}>
          <h3>{name}</h3>
          <h3>₹{total.toFixed(2)}</h3>
        </div>
        <div className={styles.content_2}>
          <p>{category}</p>
          <ul>
            <h3>Size: </h3>
            {/* {size.map((item, index) => (
              <li key={index}>{item}</li>
            ))} */}
            <li>{size}</li>
          </ul>
        </div>
        <div className={styles.content_3}>
          <p>Price: ₹{price}</p>
          <p>Discount: {discount}%</p>
        </div>
        <div className={styles.content_4}>
          <div className={styles.increment_decrement}>
            <button onClick={() => updateQuantity("remove")}>-</button>
            <p>{quantity}</p>
            <button onClick={() => updateQuantity("add")}>+</button>
          </div>
          <button onClick={deleteCartItem}>
            <i className="ri-delete-bin-5-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
