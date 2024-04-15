import React, { useEffect, useState } from "react";
import styles from "./form.module.css";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../context/Firebase";
import Loader from "../../../common/loader/Loader";
import { categoryOptions, collectionOptions, themeOptions } from "../helperForm";

function ProductAddForm({
  setOpenFrom,
  setIsVisible,
  setError,
  setMessage,
  setIsLoding,
  isLoading,
  productListData,
}) {
  const [whome, setWhome] = useState("male");
  const [chekedCheckBox, setChekedCheckBox] = useState([]);

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
            <input type="checkbox" id="XXS" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="XS">XS</label>
            <input type="checkbox" id="XS" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="S">S</label>
            <input type="checkbox" id="S" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="M">M</label>
            <input type="checkbox" id="M" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="L">L</label>
            <input type="checkbox" id="L" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="XL">XL</label>
            <input type="checkbox" id="XL" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="XXL">XXL</label>
            <input type="checkbox" id="XXL" onChange={howManyCheckBox} />
          </div>
          <div>
            <label htmlFor="XXXL">XXXL</label>
            <input type="checkbox" id="XXXL" onChange={howManyCheckBox} />
          </div>
        </div>
      );
    }
    return (
      <div className={styles.sizeBox}>
        <div>
          <label htmlFor="0-1Y">0-1Y</label>
          <input type="checkbox" id="0-1Y" onChange={howManyCheckBox} />
        </div>
        <div>
          <label htmlFor="1-3Y">1-3Y</label>
          <input type="checkbox" id="1-3Y" onChange={howManyCheckBox} />
        </div>
        <div>
          <label htmlFor="3-5Y">3-5Y</label>
          <input type="checkbox" id="3-5Y" onChange={howManyCheckBox} />
        </div>
        <div>
          <label htmlFor="5-7Y">5-7Y</label>
          <input type="checkbox" id="5-7Y" onChange={howManyCheckBox} />
        </div>
        <div>
          <label htmlFor="7-12Y">7-12Y</label>
          <input type="checkbox" id="7-12Y" onChange={howManyCheckBox} />
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const price = Number(e.target[1].value);
    const discount = Number(e.target[2].value);
    const discription = e.target[3].value;
    const imageURL1 = e.target[4].value;
    const imageURL2 = e.target[5].value;
    const forWhome = e.target[6].value;
    const category = (whome === 'male' || whome === 'women') ? e.target[15].value : e.target[12].value;
    const productCollection = (whome === 'male' || whome === 'women') ? e.target[16].value : e.target[13].value;
    const theme = (whome === 'male' || whome === 'women') ? e.target[17].value : e.target[14].value;

    let productobj = {
      name,
      price,
      discount,
      discription,
      imageURL1,
      imageURL2,
      forWhome,
      chekedCheckBox,
      category,
      productCollection,
      theme,
      date: Timestamp.now(),
    }
    try {
      setIsLoding(true)
      // await addDoc(collection(db, "products"), productobj);
      const newDocRef = await addDoc(collection(db, 'products'), productobj);
      await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
      console.log("Document added with ID:", newDocRef.id);
      setMessage("Product added successfully");
      productListData()
      setIsVisible(true);
      setIsLoding(false);
      e.target.reset();
    } catch (error) {
      console.log(error);
      setError("Something went worng, Please try again.");
      setIsVisible(true);
      setIsLoding(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Add a new product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Product name </label>
          <input type="text" id="name" placeholder="Product name" required />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="price">Product price </label>
          <input type="text" id="price" placeholder="Product price" required />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="discount">Product discount </label>
          <input
            type="text"
            id="discount"
            placeholder="Product discount"
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="discription">discription </label>
          <textarea
            type="text"
            id="discription"
            placeholder="Product discription"
            required
          ></textarea>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="image1">Product image 1 </label>
          <input type="text" id="image1" placeholder="Product image" required />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="image2">Product image 2 </label>
          <input type="text" id="image2" placeholder="Product image" required />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="forWhome">For whome </label>
          <select id="forWhome" onChange={(e) => setWhome(e.target.value)}>
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
          <select id="category">{categoryOptions(whome)}</select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="productCollection">Product productCollection </label>
          <select id="productCollection">{collectionOptions(whome)}</select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="theme">Product theme </label>
          <select id="theme">{themeOptions(whome)}</select>
        </div>

        <button className={styles.closeBtn} onClick={() => setOpenFrom(false)}>
          <i className="ri-close-fill"></i>
        </button>
        <button className={styles.btnAdd} type="submit">
          {isLoading ? <Loader size='14px' color='black' /> : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductAddForm;







// try {
//   const productRef = collection(db, "products");
//   if (
//     category !== "nothing" &&
//     theme === "nothing" &&
//     price === "nothing" &&
//     discount === "nothing"
//   ) {
//     const q = query(
//       productRef,
//       where("forWhome", "==", whome),
//       where("category", "==", category)
//     );
//     sanpShot(q);
//   } else if (
//     category === "nothing" &&
//     theme !== "nothing" &&
//     price === "nothing" &&
//     discount === "nothing"
//   ) {
//     const q = query(
//       productRef,
//       where("forWhome", "==", whome),
//       where("theme", "==", theme)
//     );
//     sanpShot(q);
//   }
//   else if (
//     category !== "nothing" &&
//     theme !== "nothing" &&
//     price === "nothing" &&
//     discount === "nothing"
//   ) {
//     const q = query(
//       productRef,
//       where("forWhome", "==", whome),
//       where("category", "==", category),
//       where("theme", "==", theme)
//     );
//     sanpShot(q);
//   }
//   else if (
//     category === "nothing" &&
//     theme === "nothing" &&
//     price !== "nothing" &&
//     discount === "nothing"
//   ) {
//     const q = query(
//       productRef,
//       where("forWhome", "==", whome),
//       where("category", "==", category),
//       where("theme", "==", theme),
//       where("price", ">", Number(priceIndex(price).min)),
//       where("price", "<", Number(priceIndex(price).max)),
//     );
//     sanpShot(q);
//   }
// } catch (error) {
//   console.log(error);
// }

