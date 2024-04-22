import React, { useState } from "react";
import styles from "./checkOut.module.css";
import { useClothContext } from "../../../context/ClothContext";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../context/Firebase";

function CheckOut() {
  const { cartItems, currentUser } = useClothContext()
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
  console.log("subTotal:: ", subTotal)

  const discount = cartItems.map(item => {
    return item.price * ((Number(item.discount) / 100) * item.quantity)
  }).reduce((a, b) => {
    return a + Number(b)
  }, 0)

  const tax = (subTotal - discount) * 0.08

  const total = subTotal - discount + tax

  async function buyNow() {
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

    var options = {
      key: "",
      key_secret: "",
      // amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "The DM Store",
      description: "for testing purpose",
      handler: async function (response) {
        console.log('response:: ', response)

        const paymentId = response.razorpay_payment_id

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email,
          userid: currentUser.uid,
          paymentId
        }

        try {
          const docRef = await addDoc(collection(db, "orders"), orderInfo)
          await setDoc(docRef, { id: docRef.id }, { merge: true })
        } catch (error) {
          console.log(error)
        }
      },


      theme: {
        color: "#3399cc"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log("pay:: ", pay)
  }

  return (
    <div className={styles.container}>
      <h3>Delivery</h3>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button>Proceed to checkout</button>
        <button>Continue Shopping</button>
      </form>
    </div>
  );
}

export default CheckOut;
