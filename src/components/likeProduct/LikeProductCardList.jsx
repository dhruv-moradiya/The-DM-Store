import React from "react";
import styles from "./likeProductCard.module.css";
import LikeProductCard from "./LikeProductCard";
import { useClothContext } from "../../context/ClothContext";
import Loader from "../common/loader/Loader";

function LikeProductCardList() {
  const { productLikeData } = useClothContext();

  if (productLikeData?.length === 0) {
    return (
      <h3 className={styles.message}>
        You didn't add any product in WishList.
      </h3>
    );
  }
  return (
    <div className={styles.container}>
      <h3>
        <i className="ri-heart-3-fill"></i> WishList
      </h3>
      <div className={styles.productCardList}>
        {!productLikeData ? (
          <Loader size="30px" containerHeight="50vh" containerWidth="100%" />
        ) : (
          productLikeData?.map((item) => {
            return (
              <LikeProductCard
                key={item.id}
                id={item.id}
                image1={item.imageURL1}
                image2={item.imageURL2}
                name={item.name}
                price={item.price}
                category={item.category}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default LikeProductCardList;