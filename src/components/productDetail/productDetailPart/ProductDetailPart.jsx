import React, { memo, useState } from "react";
import styles from "./productDetailPart.module.css";
import { useClothContext } from "../../../context/ClothContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../context/Firebase";

function ProductDetailPart({ data, setIsVisible, setMessage }) {
  const { productLikeData, getAllLikedProducts, currentUser } = useClothContext();
  const [quantity, setQuantity] = useState("1");
  const { cartStorage, cartItems } = useClothContext();
  const [sizeBtn, setSizeBtn] = useState(0);
  const [productLike, setProductLike] = useState(null)
  const isProductInLikeData = productLikeData?.find((item) => item.id === data.id) ? true : false

  function handleSizeBtnIndex(index) {
    setSizeBtn(index);
  }
  const isItemInCart = cartItems?.find((item) => item.id === data.id);
  const size = data.chekedCheckBox[sizeBtn];

  const copyUrlToClipboard = () => {
    setIsVisible(true);
    setMessage("Copy to clipboard");
    navigator.clipboard.writeText(window.location.href);
  };

  async function handleProductLike(e) {
    e.stopPropagation();

    const likedProductObj = {
      id: data.id,
      imageURL1: data.imageURL1,
      imageURL2: data.imageURL2,
      name: data.name,
      category: data.category,
      price: data.price,
    };

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const subcollectionRef = collection(userDocRef, "likedProducts");
      const documentRef = doc(subcollectionRef, data.id);

      await setDoc(documentRef, likedProductObj);
      setProductLike(true);
      getAllLikedProducts()
    } catch (error) {
      console.log("ERROR:", error);
    }
  }


  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{data.name}</h3>
      <h4>{data.category}</h4>
      <hr />
      <div className={styles.price}>
        <h4>₹{data.price}/-</h4>
        <p>MRP incl. of all taxes</p>
      </div>
      <div className={styles.discount}>
        <h4>Discount: {data.discount}%</h4>
      </div>
      <ul className={styles.checkBoxes}>
        {data.chekedCheckBox.map((item, index) => {
          return (
            <li
              key={index}
              className={`${sizeBtn === index ? styles.selectedLI : ""} `}
              onClick={() => handleSizeBtnIndex(index)}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <div className={styles.quantityPart}>
        <label htmlFor="quantity">Quantity </label>
        <select id="quantity" onChange={(e) => setQuantity(e.target.value)}>
          {new Array(10).fill("_").map((_, index) => {
            return (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => !isItemInCart && cartStorage(data, quantity, size)}
        >
          {isItemInCart ? "Already in cart" : "Add to Cart"}
        </button>
        <button onClick={!isProductInLikeData ? handleProductLike : undefined}>
          {isProductInLikeData || productLike ? (
            <>
              <i className="ri-heart-3-fill"></i>Allready added
            </>
          ) : (
            <>
              <i className="ri-heart-3-line"></i>Add to wishList
            </>
          )}
        </button>
      </div>
      <div className={styles.sharePart}>
        <p>Share</p>
        <ul>
          {[
            <i className="ri-whatsapp-line"></i>,
            <i className="ri-facebook-circle-fill"></i>,
            <i className="ri-twitter-fill"></i>,
            <i className="ri-instagram-line"></i>,
          ].map((item, index) => {
            return (
              <li key={index} onClick={copyUrlToClipboard}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className={styles.pincode}>
        <form>
          <input type="text" placeholder="Pincode" />
        </form>
        <button>Submit</button>
      </div> */}
      <div className={styles.description}>
        <h3>Product Description</h3>
        <p>{data.discription}</p>
      </div>
    </div>
  );
}

export default memo(ProductDetailPart);
