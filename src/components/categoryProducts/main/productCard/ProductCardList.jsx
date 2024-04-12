import React, { useEffect, useState } from "react";
import styles from "./productList.module.css";
import ProductCard from "./ProductCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../context/Firebase";
import { useClothContext } from "../../../../context/ClothContext";
import {
  categoryArray_female,
  categoryArray_kids,
  categoryArray_male,
} from "../../../../helpers/helpers";
import Loader from "../../../common/loader/Loader";

function ProductCardList({ cetegorySection: categoryID }) {
  const [productList, setProductList] = useState(null);
  const { section } = useClothContext();
  console.log("categoryID", categoryID)
  async function sanpShot(q) {
    let productTemp = [];
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      productTemp.push(doc.data());
    });
    setProductList(productTemp);
  }
  function filterByCategory() {
    switch (section.toLowerCase()) {
      case "men":
        return categoryArray_male.filter((item) => {
          if (Number(item.id) === Number(categoryID)) {
            return item.name;
          }
        });
      case "women":
        return categoryArray_female.filter((item) => {
          if (Number(item.id) === Number(categoryID)) {
            return item.name;
          }
        });
      case "kids":
        return categoryArray_kids.filter((item) => {
          if (Number(item.id) === Number(categoryID)) {
            return item.name;
          }
        });
      default:
        return [];
    }
  }
  function gender() {
    switch (section) {
      case "MEN":
        return "male";
      case "WOMEN":
        return "women";
      case "KIDS":
        return "kids";

      default:
        break;
    }
  }
  async function productsDataGet() {
    const productRef = collection(db, "products");

    try {
      const q = query(
        productRef,
        where("forWhome", "==", gender()),
        where("category", "==", filterByCategory()[0].name),
      );
      sanpShot(q);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    productsDataGet();
  }, []);
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
    <div className={styles.list}>
      {productList.map((item, index) => {
        return (
          <ProductCard
            key={index}
            category={item.category}
            chekedCheckBox={item.chekedCheckBox}
            discount={item.discount}
            discription={item.discription}
            forWhome={item.forWhome}
            id={item.id}
            imageURL1={item.imageURL1}
            imageURL2={item.imageURL2}
            name={item.name}
            price={item.price}
            productCollection={item.productCollection}
            theme={item.theme}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
