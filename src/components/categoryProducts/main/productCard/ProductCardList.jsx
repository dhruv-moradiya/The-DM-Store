import React, { useEffect, useState } from "react";
import styles from "./productList.module.css";
import ProductCard from "./ProductCard";
import Loader from "../../../common/loader/Loader";

function ProductCardList({ productList }) {
  if (!productList)
    return (
      <div className={styles.list}>
        <Loader size="30px" color="black" />
      </div>
    );
  if (productList.length === 0)
    return (
      <div className={styles.list} style={{ textAlign: "center" }}>
        <h2>Product is not available.</h2>
      </div>
    );
  return (
    <div className={`${styles.list} ${productList.length <= 2 ? styles.listItem2 : ""}`}>
      {productList.map((item, index) => {
        return (
          <ProductCard
            key={index}
            category={item.category}
            id={item.id}
            imageURL1={item.imageURL1}
            imageURL2={item.imageURL2}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
