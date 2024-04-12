import React from "react";
import styles from "./deleteProduct.module.css";

function DeleteProduct({ setShowDeletePopUp, deleteProductFun }) {
  return (
    <div className={styles.container}>
      <p>Are you sure you want to delete this product?</p>
      <div>
        <button onClick={() => deleteProductFun()}>Delete</button>
        <button onClick={() => setShowDeletePopUp(false)}>Cancle</button>
      </div>
    </div>
  );
}

export default DeleteProduct;
