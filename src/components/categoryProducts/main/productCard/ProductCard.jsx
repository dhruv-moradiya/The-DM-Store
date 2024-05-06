import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./productList.module.css";
import { useClothContext } from "../../../../context/ClothContext";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../context/Firebase";

function ProductCard({
  imageURL1,
  imageURL2,
  name,
  price,
  id,
  category,
}) {
  const navigate = useNavigate();
  const { currentUser, productLikeData, getAllLikedProducts } = useClothContext();
  const [productLike, setProductLike] = useState(productLikeData?.find((item) => item.id === id) ? true : false);

  if (!productLikeData) return null

  let isLikedProduct = false;

  if (productLikeData.find((item) => item.id === id)) {
    isLikedProduct = true
  }

  async function handleProductLike(e) {
    e.stopPropagation();

    const likedProductObj = {
      id,
      imageURL1,
      imageURL2,
      name,
      category,
      price,
    };

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const subcollectionRef = collection(userDocRef, "likedProducts");
      const documentRef = doc(subcollectionRef, id);

      await setDoc(documentRef, likedProductObj);
      setProductLike(true);
      getAllLikedProducts()
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async function hadleProductDislike(e) {
    e.stopPropagation();

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const subcollectionRef = collection(userDocRef, "likedProducts");
      const documentRef = doc(subcollectionRef, id);

      await deleteDoc(documentRef);
      setProductLike(false);
      getAllLikedProducts()
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  function redirection() {
    navigate(`/${category}/${id}`);
  }

  return (
    <div className={styles.cardContainer} onClick={redirection}>
      <div className={styles.imageContainer}>
        <img className={styles.imageFirst} src={imageURL1} alt="Product" />
        <img className={styles.imageSecond} src={imageURL2} alt="Product" />
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{category}</p>
        <p className={styles.price}>₹&nbsp;&nbsp;{price}</p>
        <p>MRP incl. if all taxes</p>
      </div>
      <button
        className={`${styles.likeBtn} ${(productLike || isLikedProduct) ? styles.productLike : ""}`}
        onClick={isLikedProduct || productLike ? hadleProductDislike : handleProductLike}
      >
        <i className="ri-heart-3-line"></i>
      </button>
    </div>
  );
}

export default ProductCard;
