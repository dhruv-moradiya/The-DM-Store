import React from 'react'
import styles from './category.module.css'
import { useNavigate } from 'react-router-dom'
import { useClothContext } from '../../../context/ClothContext'

function CategoryCard({ src, categoryID }) {
  const { section } = useClothContext()
  const navigate = useNavigate()
  function hanleClick(id) {
    navigate(`/Category_${section.toLowerCase()}-${id}`)
  }
  return (
    <div className={styles.containerCard} onClick={() => hanleClick(categoryID)}>
      <div className={styles.imageContainer}>
        <img src={src} alt="Category" />
      </div>
    </div>
  )
}

export default CategoryCard