import React, { useEffect, useState } from "react";
import {
  categoryOptions,
  collectionOptions,
  themeOptions,
} from "../helperForm";
import styles from "../form/form.module.css";
import Loader from "../../../common/loader/Loader";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../context/Firebase";

function UpdateForm({
  productList,
  setOpenUpdateFrom,
  isLoading,
  setIsLoding,
  setIsVisible,
  setError,
  setMessage,
  idProduct,
  productListData,
}) {
  const product = productList.find((item) => item.id === idProduct);
  const [whome, setWhome] = useState("male");
  const [chekedCheckBox, setChekedCheckBox] = useState(product.chekedCheckBox);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [disc, setDisc] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price);
      setDiscount(product.discount);
      setDisc(product.discription);
      setWhome(product.forWhome);
      setImage1(product.imageURL1);
      setImage2(product.imageURL2);
      setCategory(product.category);
      setCollection(product.productCollection);
      setTheme(product.theme);
    }
  }, [product]);

  function handleCheckboxChange(checkBoxID) {
    const isChecked = chekedCheckBox.includes(checkBoxID);
    if (isChecked) {
      setChekedCheckBox(chekedCheckBox.filter((item) => item !== checkBoxID));
    } else {
      setChekedCheckBox([...chekedCheckBox, checkBoxID]);
    }
  }

  function howManyCheckBox(e) {
    if (e.target.checked) {
      setChekedCheckBox([...chekedCheckBox, e.target.id]);
    }
  }

  function renderSizeBox() {
    if (whome === "male" || whome === "women") {
      return (
        <div className={styles.sizeBox}>
          <div>
            <label htmlFor="XXS">XXS</label>
            <input
              type="checkbox"
              id="XXS"
              checked={chekedCheckBox.includes("XXS")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("XXS")}
            />
          </div>
          <div>
            <label htmlFor="XS">XS</label>
            <input
              type="checkbox"
              id="XS"
              checked={chekedCheckBox.includes("XS")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("XS")}
            />
          </div>
          <div>
            <label htmlFor="S">S</label>
            <input
              type="checkbox"
              id="S"
              checked={chekedCheckBox.includes("S")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("S")}
            />
          </div>
          <div>
            <label htmlFor="M">M</label>
            <input
              type="checkbox"
              id="M"
              checked={chekedCheckBox.includes("M")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("M")}
            />
          </div>
          <div>
            <label htmlFor="L">L</label>
            <input
              type="checkbox"
              id="L"
              checked={chekedCheckBox.includes("L")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("L")}
            />
          </div>
          <div>
            <label htmlFor="XL">XL</label>
            <input
              type="checkbox"
              id="XL"
              checked={chekedCheckBox.includes("XL")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("XL")}
            />
          </div>
          <div>
            <label htmlFor="XXL">XXL</label>
            <input
              type="checkbox"
              id="XXL"
              checked={chekedCheckBox.includes("XXL")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("XXL")}
            />
          </div>
          <div>
            <label htmlFor="XXL">XXL</label>
            <input
              type="checkbox"
              id="XXXL"
              checked={chekedCheckBox.includes("XXXL")}
              onChange={howManyCheckBox}
              onClick={() => handleCheckboxChange("XXXL")}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={styles.sizeBox}>
        <div>
          <label htmlFor="0-1Y">0-1Y</label>
          <input
            type="checkbox"
            id="0-1Y"
            onChange={howManyCheckBox}
            onClick={() => handleCheckboxChange("0-1Y")}
          />
        </div>
        <div>
          <label htmlFor="1-3Y">1-3Y</label>
          <input
            type="checkbox"
            id="1-3Y"
            onChange={howManyCheckBox}
            onClick={() => handleCheckboxChange("1-3Y")}
          />
        </div>
        <div>
          <label htmlFor="3-5Y">3-5Y</label>
          <input
            type="checkbox"
            id="3-5Y"
            onChange={howManyCheckBox}
            onClick={() => handleCheckboxChange("3-5Y")}
          />
        </div>
        <div>
          <label htmlFor="5-7Y">5-7Y</label>
          <input
            type="checkbox"
            id="5-7Y"
            onChange={howManyCheckBox}
            onClick={() => handleCheckboxChange("5-7Y")}
          />
        </div>
        <div>
          <label htmlFor="7-12Y">7-12Y</label>
          <input
            type="checkbox"
            id="7-12Y"
            onChange={howManyCheckBox}
            onClick={() => handleCheckboxChange("7-12Y")}
          />
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoding(true)
    try {
      await setDoc(doc(db, 'products', idProduct), {
        id: idProduct,
        name: productName,
        price,
        discount,
        discription: disc,
        imageURL1: image1,
        imageURL2: image2,
        forWhome: whome,
        chekedCheckBox,
        category,
        productCollection: collection,
        theme,
        date: Timestamp.now(),
      })
      setMessage('Product update successfully.')
      // productListData()
    } catch (error) {
      setIsVisible(true)
      setError(error)
      setMessage('Something Went wrong try again.')
      console.log(error)
    } finally {
      setIsVisible(true)
      setIsLoding(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Update Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Product name </label>
          <input
            type="text"
            id="name"
            placeholder="Product name"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="price">Product price </label>
          <input
            type="text"
            id="price"
            placeholder="Product price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="discount">Product discount </label>
          <input
            type="text"
            id="discount"
            placeholder="Product discount"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="discription">discription </label>
          <textarea
            type="text"
            id="discription"
            placeholder="Product discription"
            onChange={(e) => setDisc(e.target.value)}
            value={disc}
            required
          ></textarea>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="image1">Product image 1 </label>
          <input
            type="text"
            id="image1"
            placeholder="Product image"
            onChange={(e) => setImage1(e.target.value)}
            value={image1}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="image2">Product image 2 </label>
          <input
            type="text"
            id="image2"
            placeholder="Product image"
            onChange={(e) => setImage2(e.target.value)}
            value={image2}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="forWhome">For whome </label>
          <select
            id="forWhome"
            onChange={(e) => setWhome(e.target.value)}
            value={whome}
          >
            <option value="male">Male</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className={styles.sizeChart}>
          <h3>Size</h3>
          {renderSizeBox()}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="category">Product category </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {categoryOptions(whome)}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="productCollection">Product productCollection </label>
          <select
            id="productCollection"
            onChange={(e) => setCollection(e.target.value)}
            value={collection}
          >
            {collectionOptions(whome)}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="theme">Product theme </label>
          <select
            id="theme"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
          >
            {themeOptions(whome)}
          </select>
        </div>

        <button
          className={styles.closeBtn}
          onClick={() => setOpenUpdateFrom(false)}
        >
          <i className="ri-close-fill"></i>
        </button>
        <button className={styles.btnAdd} type="submit">
          {isLoading ? <Loader size="14px" color="black" /> : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
