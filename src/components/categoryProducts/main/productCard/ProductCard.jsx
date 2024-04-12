import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./productList.module.css";

function ProductCard({
  theme,
  imageURL1,
  imageURL2,
  name,
  price,
  procategory,
  productCollection,
  chekedCheckBox,
  discount,
  discription,
  forWhome,
  id,
  category,
}) {
  const [productLike, setProductLike] = useState(false);
  const navigate = useNavigate();
  function hadleProductLike() {
    setProductLike(!productLike);
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
        className={`${styles.likeBtn} ${productLike && styles.productLike}`}
        onClick={hadleProductLike}
      >
        <i className="ri-heart-3-line"></i>
      </button>
    </div>
  );
}

export default ProductCard;
