import React, { useEffect, useState } from "react";
import styles from "./categoryProduct.module.css";
import { useParams } from "react-router-dom";
import SideBar from "../../components/categoryProducts/sideBar/SideBar";
import ProductCardList from "../../components/categoryProducts/main/productCard/ProductCardList";
import { filterByType, filterByWhat, gender } from "./helperCategoryProducts";
import { useClothContext } from "../../context/ClothContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../context/Firebase";

function CategoryProducts() {
  let { category } = useParams();
  const { section } = useClothContext();
  const [productList, setProductList] = useState(null);
  const [filteredProductList, setFilterdProductList] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const cetegorySection = category.split("-")[1];

  let filterStr = category.split("-");
  const what = filterByWhat(filterStr).type;

  async function sanpShot(q) {
    let productTemp = [];
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      productTemp.push(doc.data());
    });
    setProductList(productTemp);
  }

  async function productsDataGet() {
    const productRef = collection(db, "products");

    try {
      const q = query(
        productRef,
        where("forWhome", "==", gender(section)),
        where(
          what,
          "==",
          filterByType(what, Number(filterStr[1]), section).name
        )
      );
      sanpShot(q);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productsDataGet();
  }, [category]);

  return (
    <div className={styles.container}>
      <button className={styles.filterBtn} onClick={() => setShowSideBar(true)}>
        Filter
      </button>
      <SideBar
        category={category}
        productList={productList}
        setProductList={setProductList}
        setFilterdProductList={setFilterdProductList}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />
      <ProductCardList
        cetegorySection={cetegorySection}
        productList={!filteredProductList ? productList : filteredProductList}
      />
    </div>
  );
}

export default CategoryProducts;
