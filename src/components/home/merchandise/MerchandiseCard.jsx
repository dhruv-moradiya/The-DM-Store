import React from 'react'
import styles from './merchandise.module.css'
import { useNavigate } from "react-router-dom";
function MerchandiseCard({ src, id }) {
  const navigate = useNavigate();
  function navigation() {
    navigate(`/merchndise-${id}`)
  }
  return (
    <div className={styles.containerCard} onClick={navigation}>
      <img src={src} alt="" />
    </div>
  )
}

export default MerchandiseCard