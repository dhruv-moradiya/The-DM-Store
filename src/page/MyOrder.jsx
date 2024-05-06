import React, { useEffect, useState } from "react";
import PurchasedProductsList from "../components/myOrder/PurchasedProductsList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../context/Firebase";
import { useClothContext } from "../context/ClothContext";
import Loader from "../components/common/loader/Loader";

function MyOrder() {
  const { currentUser } = useClothContext();
  const [orderData, setOrderData] = useState(null);
  async function getOrderData() {
    try {
      const orderRef = collection(db, "orders");
      const q = query(orderRef, where("userid", "==", currentUser?.uid));

      const querySnapshot = await getDocs(q);
      let temp = [];

      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      setOrderData(temp);
    } catch (error) {
      console.error("Error getting orders:", error);
    }
  }

  useEffect(() => {
    getOrderData();
  }, [currentUser]);
  if (!orderData)
    return (
      <Loader size="25px" containerHeight={"calc(100vh - 536px)"} containerWidth={"100vh"} />
    );
  if (orderData.length === 0)
    return (
      <p style={{ padding: "0 20px" }}>It looks like you haven't placed any orders yet. Ready to start shopping? If you need assistance finding something or have questions about our products, feel free to reach out. We're here to help!</p>
    );
  return (
    <div>
      <PurchasedProductsList orderData={orderData} currentUser={currentUser} />
    </div>
  );
}

export default MyOrder;
