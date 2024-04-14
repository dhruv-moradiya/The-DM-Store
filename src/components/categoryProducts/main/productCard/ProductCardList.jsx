import React, { useEffect, useState } from "react";
import styles from "./productList.module.css";
import ProductCard from "./ProductCard";
import Loader from "../../../common/loader/Loader";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../context/Firebase";
import { useClothContext } from "../../../../context/ClothContext";

function ProductCardList({ cetegorySection: categoryID, productList }) {
  const { currentUser } = useClothContext();
  const [productLikeData, setProductLikeData] = useState(null);

  async function getAllLikedProducts() {
    const userDocRef = doc(db, "users", currentUser?.uid);
    const subcollectionRef = collection(userDocRef, "likedProducts");


    const querySnapshot = await getDocs(subcollectionRef)
    const temp = []
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
    })
    setProductLikeData(temp)
    console.log("temp", temp)
  }

  useEffect(() => { getAllLikedProducts() }, [])


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
            id={item.id}
            imageURL1={item.imageURL1}
            imageURL2={item.imageURL2}
            name={item.name}
            price={item.price}
            productLikeData={productLikeData}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
