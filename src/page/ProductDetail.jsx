import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductPhotos from "../components/productDetail/productPhotos/ProductPhotos";
import { db } from "../context/Firebase";
import Loader from "../components/common/loader/Loader";
import ProductDetailPart from "../components/productDetail/productDetailPart/ProductDetailPart";
import AddReview from "../components/productDetail/reviewPart/AddReview";
import PopUp from "../components/common/popUp/PopUp";

function ProductDetail() {
  const { productID } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoding] = useState(false);

  function hidePopOver() {
    setIsVisible(false);
    setError("");
  }

  async function getProductData() {
    const productRef = collection(db, "products");
    const q = query(productRef, where("id", "==", `${productID}`));
    const temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setData(temp);
  }
  console.log(data);
  useEffect(() => {
    getProductData();
  }, []);
  if (!data)
    return (
      <div style={{ height: "50vh", display: "flex", alignItems: "center" }}>
        <Loader size="30px" />
      </div>
    );
  return (
    <>
      <div className="productDetailPageContainer">
        <ProductPhotos
          imageURL1={data[0].imageURL1}
          imageURL2={data[0].imageURL2}
        />
        <ProductDetailPart
          data={data[0]}
          setIsVisible={setIsVisible}
          setMessage={setMessage}
        />
      </div>
      <AddReview
        productID={productID}
        setError={setError}
        setIsLoding={setIsLoding}
        setMessage={setMessage}
        setIsVisible={setIsVisible}
        isLoading={isLoading}
      />
      {(isVisible && error) ||
        (isVisible && message && (
          <PopUp
            hidePopOver={hidePopOver}
            isVisible={isVisible}
            status={error ? "error" : "success"}
            message={message}
          />
        ))}
    </>
  );
}

export default ProductDetail;
