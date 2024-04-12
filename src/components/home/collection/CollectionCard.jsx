import React from 'react'
import styles from './collection.module.css'
import { useNavigate } from "react-router-dom";
function CollectionCard({ src, id, merchndise }) {
  const navigate = useNavigate();
  function navigation() {
    navigate(`/${merchndise ? 'merchndise' : 'collection'}-${id}`)
  }
  return (
    <div className={styles.cardContainer} onClick={navigation}>
      <img src={src} alt="Collection" />
    </div>
  )
}

export default CollectionCard