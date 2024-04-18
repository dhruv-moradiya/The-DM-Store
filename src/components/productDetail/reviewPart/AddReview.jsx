import React, { useEffect, useState } from "react";
import styles from "./addReview.module.css";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../context/Firebase";
import { useClothContext } from "../../../context/ClothContext";
import Loader from "../../common/loader/Loader";

function AddReview({
  productID,
  setError,
  setIsLoding,
  setMessage,
  setIsVisible,
  isLoading,
}) {
  const { currentUser } = useClothContext();

  const [rating, setRating] = useState("5");
  const [content, setContent] = useState("");
  const [data, setData] = useState(null);

  async function handleReview(e) {
    e.preventDefault();
    const reviewObj = {
      id: productID,
      userName: currentUser.displayName,
      userPhoto: currentUser.photoURL,
      rating,
      content,
      date: Timestamp.now(),
    };

    try {
      setIsLoding(true);
      await setDoc(
        doc(db, "review", `${productID}_${currentUser.uid}`),
        reviewObj
      );
      setIsVisible(true);
      setMessage("Review added successfully");
      setContent("");
      getAllReview();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsVisible(true);
      setMessage("Something went Wrong.");
    } finally {
      setIsLoding(false);
    }
  }

  async function getAllReview() {
    try {
      const reviewRef = collection(db, "review");
      const q = query(reviewRef, where("id", "==", productID));
      const querySnapshot = await getDocs(q);
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
      });
      setData(reviews);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllReview();
  }, []);
  function renderReviews() {
    if (data.length === 0) {
      return <h3>No Reviews Yet</h3>;
    } else {
      return data.map((item, index) => {
        if (item.id !== productID) return null;
        return (
          <div className={styles.reviwe} key={index}>
            <div className={styles.userPhoto}>
              <img src={item.userPhoto} alt={item.userName} />
            </div>
            <div className={styles.reviweDetail}>
              <div className={styles.userName_rating}>
                <div className={styles.stars}>
                  {new Array(5).fill(1).map((_, index) => {
                    return (
                      <i
                        key={index}
                        className="ri-star-fill"
                        style={
                          index + 1 <= Number(item.rating)
                            ? { color: "red" }
                            : { color: "black" }
                        }
                      ></i>
                    );
                  })}
                </div>
                <div className={styles.userName}>{item.userName}</div>
                <div className={styles.reviweTime}>27,oct,2013</div>
              </div>
              <div className={styles.reviweContent}>{item.content}</div>
            </div>
          </div>
        );
      });
    }
  }
  function getRatings() {
    if (!data || data.length === 0) return 0;
    else if (data.length === 1) {
      return data[0].rating;
    } else {
      const total = data?.reduce((first, second) => {
        return Number(first.rating) + Number(second.rating);
      }, 0);

      return total / data.length;
    }
  }
  if (!data) return null;
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3>Review</h3>
        <div className={styles.addReview}>
          <div>
            <form onSubmit={handleReview}>
              <input
                type="text"
                placeholder="Review"
                required
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <select name="rating" onChange={(e) => setRating(e.target.value)}>
                <option value="1">😨 Not Worthy</option>
                <option value="2">😔 Dissatisfy</option>
                <option value="3">😳 OK OK</option>
                <option value="4">🥰 Good</option>
                <option value="5">😍 Amazing</option>
              </select>
              <button>
                {isLoading ? <Loader size="8px" /> : "Add review"}
              </button>
            </form>
          </div>
          <p>Overall rating : {getRatings()}</p>
        </div>
      </div>
      <div>{renderReviews()}</div>
    </div>
  );
}

export default AddReview;
