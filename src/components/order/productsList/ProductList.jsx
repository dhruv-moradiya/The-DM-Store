import React, { memo } from "react";
import styles from "./productList.module.css";
import ProductCard from "./ProductCard";
import { useClothContext } from "../../../context/ClothContext";

function ProductList() {
  const { currentUser, cartItems } = useClothContext();

  if (!cartItems) return;
  if (cartItems.length === 0)
    return (
      <h2 className={styles.message}>
        Looks like your cart is feeling a bit light! Why not browse our amazing
        selection and add some items to your cart? Happy shopping!🛒🛒
      </h2>
    );
  return (
    <div className={styles.container}>
      <h2>🥰 {currentUser?.displayName}'s Cart 🥰</h2>
      {cartItems.map((item, index) => (
        <ProductCard
          key={index}
          orderID={item.orderID}
          src={item.imageURL1}
          name={item.name}
          category={item.category}
          size={item.size}
          price={Number(item.price)}
          discount={Number(item.discount)}
          quantity={Number(item.quantity)}
        />
      ))}

    </div>
  );
}

export default memo(ProductList);
