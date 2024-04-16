import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth, db } from "./Firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

const clothContext = createContext();

export const ClothContextProvider = ({ children }) => {
  const [section, setSection] = useState("MEN");
  const [currentUser, setCurrentUser] = useState(null);
  const [allProductData, setAllProductData] = useState(null);
  const [productLikeData, setProductLikeData] = useState(null);

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

  useEffect(() => {
    getAllLikedProducts();
  }, [currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return null;
      }
      setCurrentUser(user);
    });
  }, [auth]);



  console.log("currentUser: ", currentUser);
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
        getAllLikedProducts
      }}
    >
      {children}
    </clothContext.Provider>
  );
};

export const useClothContext = () => {
  return useContext(clothContext);
};
