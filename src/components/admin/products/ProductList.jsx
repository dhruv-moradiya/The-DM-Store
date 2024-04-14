import React, { useEffect, useState } from "react";
import styles from "./productList.module.css";
import ProductAddForm from "./form/ProductAddForm";
import PopUp from "../../common/popUp/PopUp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../context/Firebase";
import Loader from "../../common/loader/Loader";
import { capitalize, getDate } from "./form/helper";
import Filter from "./filter/Filter";
import DeleteProduct from "./deleteProduct/DeleteProduct";

function ProductList() {
  const [productList, setProductList] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [openFrom, setOpenFrom] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoding] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  function hidePopOver() {
    setIsVisible(false);
    setError("");
  }

  function showDeletePopUpBox(id) {
    setShowDeletePopUp(true);
    window.scroll(0, 0);
    setIdProduct(id);
  }

  async function deleteProduct() {
    try {
      await deleteDoc(doc(db, "products", idProduct));
      setIsVisible(true);
      setMessage("Product deleted successfully");
      setShowDeletePopUp(false);
      productListData();
      setIdProduct(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function productListData() {
    let productTemp = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, "products"),
        orderBy("date", "asc")
      );
      querySnapshot.forEach((doc) => {
        productTemp.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }

    setProductList(productTemp);
  }

  useEffect(() => {
    productListData();
  }, []);

  return (
    <>
      {showDeletePopUp && (
        <DeleteProduct
          setShowDeletePopUp={setShowDeletePopUp}
          deleteProductFun={deleteProduct}
        />
      )}
      <div className={styles.container}>
        {(isVisible && error) ||
          (isVisible && message && (
            <PopUp
              hidePopOver={hidePopOver}
              isVisible={isVisible}
              status="success"
              message={message}
            />
          ))}

        <div className={styles.formBtns}>
          <Filter filterData={filterData} setFilterData={setFilterData} />
          <button onClick={() => setOpenFrom(true)}>
            <span>
              <i className="ri-apps-2-add-line"></i>
            </span>
            <span>Add Products</span>
          </button>
        </div>
        <h3>Product List</h3>
        {!productList ? (
          <Loader size="30px" color="black" />
        ) : (
          <table className={styles.tableProductList}>
            <thead className={styles.productListThead}>
              <tr>
                <th>Product photo</th>
                <th>Product name</th>
                <th>For Whome</th>
                <th>Category</th>
                <th>Collection</th>
                <th>Theme</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Product Adding date</th>
              </tr>
            </thead>
            <tbody className={styles.productListTbody}>
              {productList.map((item, index) => {
                const timestamp = item.date;
                return (
                  <tr key={index}>
                    <td>
                      <div className={styles.imageTD}>
                        <img src={item.imageURL1} alt="" />
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{capitalize(item.forWhome)}</td>
                    <td>{item.category}</td>
                    <td>{item.productCollection}</td>
                    <td>{item.theme}</td>
                    <td>₹{item.price}</td>
                    <td>{item.discount}%</td>
                    <td>
                      <i className="ri-brush-2-fill"></i>
                    </td>
                    <td>
                      <i
                        className="ri-delete-bin-6-fill"
                        onClick={() => showDeletePopUpBox(item.id)}
                      ></i>
                    </td>
                    <td>{getDate(timestamp.seconds)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {openFrom && (
          <ProductAddForm
            setOpenFrom={setOpenFrom}
            setIsVisible={setIsVisible}
            setError={setError}
            setMessage={setMessage}
            setIsLoding={setIsLoding}
            isLoading={isLoading}
            productListData={productListData}
          />
        )}
      </div>
    </>
  );
}

export default ProductList;
