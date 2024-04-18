import React, { useEffect } from 'react'
import styles from './likeProductCard.module.css'
import { useNavigate } from "react-router-dom";
import { useClothContext } from '../../context/ClothContext';
import { db } from '../../context/Firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
function LikeProductCard({ id, image1, image2, name, price, category }) {
  const navigate = useNavigate();
  const { currentUser, getAllLikedProducts } = useClothContext()
  function redirection() {
    navigate(`/${category}/${id}`);
  }
  async function handleProductDislike(e) {
    e.stopPropagation()

    const userDocRef = doc(db, "users", currentUser.uid);
    const subcollectionRef = collection(userDocRef, "likedProducts");
    const documentRef = doc(subcollectionRef, id);

    await deleteDoc(documentRef);
    getAllLikedProducts()
    console.log('Delete');
  }
  useEffect(() => { }, [])
  return (
    <div className={styles.cardCotainer} onClick={redirection}>
      <div className={styles.image}>
        <img src={image1} alt={name} className={styles.image1} />
        <img src={image2} alt={name} className={styles.image2} />
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{category}</p>
        <p>₹{price}</p>
      </div>
      <div className={styles.btn} onClick={handleProductDislike}>
        <i className="ri-heart-3-line"></i>
      </div>
    </div>
  )
}

export default LikeProductCard