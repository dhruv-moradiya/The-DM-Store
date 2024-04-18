import React, { useState } from "react";
import styles from "./productDetailPart.module.css";

function ProductDetailPart({ data, setIsVisible, setMessage }) {

  const copyUrlToClipboard = () => {
    setIsVisible(true)
    setMessage('Copy to clipboard')
    navigator.clipboard.writeText(window.location.href);
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{data.name}</h3>
      <hr />
      <div className={styles.price}>
        <h4>₹{data.price}/-</h4>
        <p>MRP incl. of all taxes</p>
      </div>
      <ul className={styles.checkBoxes}>
        {data.chekedCheckBox.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <div className={styles.quantityPart}>
        <label htmlFor="quantity">Quantity </label>
        <select id="quantity">
          {new Array(10).fill("_").map((_, index) => {
            return <option value={index + 1} key={index}>{index + 1}</option>;
          })}
        </select>
      </div>
      <div className={styles.btns}>
        <button>Add to Cart</button>
        <button>
          <i className="ri-heart-3-line"></i>Add to wishList
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
            return <li key={index} onClick={copyUrlToClipboard}>{item}</li>;
          })}
        </ul>
      </div>
      <div className={styles.pincode}>
        <form>
          <input type="text" placeholder="Pincode" />
        </form>
        <button>Submit</button>
      </div>
      <div className={styles.description}>
        <h3>Product Description</h3>
        <p>
          {data.discription}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailPart;
