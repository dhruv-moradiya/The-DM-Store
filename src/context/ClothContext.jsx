import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useReducer, useState } from "react";
import { createContext, useContext } from "react";
import { auth, db } from "./Firebase";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { initialState, reducer } from "./Reducer";

const clothContext = createContext();

export const ClothContextProvider = ({ children }) => {
  const [section, setSection] = useState("MEN");
  const [currentUser, setCurrentUser] = useState(null);
  const [allProductData, setAllProductData] = useState(null);
  const [productLikeData, setProductLikeData] = useState(null);
  const [cartItems, setCartItems] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState);

  function forWhome() {
    switch (section) {
      case "MEN":
        return "male";
      case "WOMEN":
        return "women";
      case "KIDS":
        return "kids";
      default:
        break;
    }
  }

  async function productListData() {
    const productRef = collection(db, "products");
    const temp = [];
    try {
      const q = query(productRef, where("forWhome", "==", `${forWhome()}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      setAllProductData(temp);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllLikedProducts() {
    if (!currentUser?.uid) {
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    const subcollectionRef = collection(userDocRef, "likedProducts");

    const querySnapshot = await getDocs(subcollectionRef);
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setProductLikeData(temp);
  }

  async function getCartItems() {
    console.log("getCartItems")
    if (!currentUser) return

    const userDocRef = doc(db, "users", currentUser.uid);
    const subcollectionRef = collection(userDocRef, "cartItems");

    const querySnapshot = await getDocs(subcollectionRef);
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setCartItems(temp)
  }

  async function cartStorage(obj, quantity, size) {
    if (!currentUser?.uid) {
      return;
    }
    const quantityItem = Number(quantity)
    const userDocRef = doc(db, "users", currentUser.uid);
    const subcollectionRef = collection(userDocRef, "cartItems");

    const itemRef = await addDoc(subcollectionRef, { ...obj, quantity: quantityItem, size })
    await setDoc(doc(subcollectionRef, itemRef.id), { orderID: itemRef.id }, { merge: true })
    getCartItems()
  }



  useEffect(() => {
    getAllLikedProducts();
    getCartItems()
  }, [currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return null;
      }
      setCurrentUser(user);
    });
  }, [auth]);

  return (
    <clothContext.Provider
      value={{
        allProductData,
        productListData,
        section,
        setSection,
        currentUser,
        setCurrentUser,
        productLikeData,
        getAllLikedProducts,
        cartStorage,
        getCartItems,
        cartItems,
      }}
    >
      {children}
    </clothContext.Provider>
  );
};

export const useClothContext = () => {
  return useContext(clothContext);
};
