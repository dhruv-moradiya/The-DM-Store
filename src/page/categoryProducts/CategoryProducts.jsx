import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/categoryProducts/sideBar/SideBar";
import ProductCardList from "../../components/categoryProducts/main/productCard/ProductCardList";

function CategoryProducts() {
  let { category } = useParams();
  const cetegorySection = category.split("-")[1];
  return (
    <div style={{ padding: "10px 0px", display: "flex", width: "100%" }}>
      <SideBar />
      <ProductCardList cetegorySection={cetegorySection} />
    </div>
  );
}

export default CategoryProducts;
