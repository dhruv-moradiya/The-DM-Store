import React, { useEffect, useState } from "react";
import ProductList from "../components/order/productsList/ProductList";
import CheckOut from "../components/order/checkout/CheckOut";
import { useClothContext } from "../context/ClothContext";

function Order() {
  const { currentUser, cartItems } = useClothContext();

  return (
    <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
      <ProductList
        currentUser={currentUser}
        cartItems={cartItems}
      />

      <CheckOut />
    </div>
  );
}

export default Order;
