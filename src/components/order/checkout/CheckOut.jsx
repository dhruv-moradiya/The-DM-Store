import React, { memo, useState } from "react";
import styles from "./checkOut.module.css";
import { useClothContext } from "../../../context/ClothContext";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../context/Firebase";

function CheckOut() {
  const { cartItems, currentUser, getCartItems } = useClothContext()
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");



  if (!cartItems || cartItems.length === 0) return null;

  const subTotal = cartItems.reduce((a, b) => {
    return a + (Number(b.price) * b.quantity)
  }, 0)

  const discount = cartItems.map(item => {
    return item.price * ((Number(item.discount) / 100) * item.quantity)
  }).reduce((a, b) => {
    return a + Number(b)
  }, 0)

  const tax = (subTotal - discount) * 0.08

  const total = (subTotal - discount) + tax

  //---------------------------------------------------

  async function deleteCartItems() {

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const cartRef = collection(userRef, 'cartItems');
      const querySnapshot = await getDocs(cartRef);

      const deletePromises = querySnapshot.docs.map((docSnapshot) => {
        const docRef = doc(cartRef, docSnapshot.id);
        return deleteDoc(docRef);
      });

      await Promise.all(deletePromises);
      getCartItems()
    } catch (error) {
      console.error("Error:", error);
    }
  }


  async function buyNow(e) {
    e.preventDefault()
    const addressInfo = {
      name,
      address,
      pincode,
      city,
      state,
      phoneNumber: phone,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }

    const options = {
      key: import.meta.env.VITE_APP_KEY,
      key_secret: import.meta.env.VITE_APP_SECRET_KEY,
      amount: parseInt(total * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "The DM Store",
      description: "for testing purpose",
      handler: async function (response) {

        const paymentId = response.razorpay_payment_id

        const orderInfo = {
          cartItems: cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          userName: currentUser.displayName,
          phone,
          email: currentUser.email,
          taxAmount: tax,
          discount,
          total,
          userid: currentUser.uid,
          paymentId
        }

        try {
          const orderRef = await addDoc(collection(db, "orders"), orderInfo)
          await setDoc(orderRef, { id: orderRef.id }, { merge: true })
          deleteCartItems()

        } catch (error) {
          console.log(error)
        }
      },


      theme: {
        color: "#E11B23"
      }
    };

    const pay = new window.Razorpay(options);
    pay.open();
  }

  //---------------------------------------------------


  return (
    <div className={styles.container}>
      <h3>Delivery</h3>
      <form onSubmit={buyNow}>
        <input
          type="text"
          placeholder="Name"
          value={name ? name : currentUser.displayName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email ? email : currentUser.email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Subtotal: </th>
              <th>₹{subTotal}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Discount: </td>
              <td>₹{discount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery: </td>
              <td>₹80</td>
            </tr>
            <tr>
              <td>Tax 8%: </td>
              <td>₹{tax.toFixed(2)}</td>
            </tr>
            <tr className={styles.total}>
              <td>Total: </td>
              <td>₹{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <button type="submit">Proceed to checkout</button>
        <button>Continue Shopping</button>
      </form>
    </div>
  );
}

export default memo(CheckOut);
