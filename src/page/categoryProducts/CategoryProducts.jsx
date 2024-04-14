import React, { useEffect, useState } from "react";
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
  console.log("productList:", productList);
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
  }, []);

  return (
    <div style={{ padding: "10px 0px", display: "flex", width: "100%" }}>
      <SideBar />
      <ProductCardList
        cetegorySection={cetegorySection}
        productList={productList}
      />
    </div>
  );
}

export default CategoryProducts;
