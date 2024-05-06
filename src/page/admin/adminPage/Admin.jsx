import React, { useEffect, useState } from 'react'
import Howmany from '../../../components/admin/adminPage/howMany/Howmany'
import Order from '../../../components/admin/adminPage/order/Order'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useClothContext } from '../../../context/ClothContext';
import { db } from '../../../context/Firebase';

function Admin() {
  const { currentUser, cartItems } = useClothContext();
  const [orderData, setOrderData] = useState(null);

  async function getOrderData() {
    try {
      const orderRef = collection(db, "orders");
      // const q = query(orderRef, where("userid", "==", currentUser?.uid));

      const querySnapshot = await getDocs(orderRef);
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

  if (!orderData) {
    return null
  }
  return (
    <>
      <Howmany />
      <Order orderData={orderData} />
    </>
  )
}

export default Admin