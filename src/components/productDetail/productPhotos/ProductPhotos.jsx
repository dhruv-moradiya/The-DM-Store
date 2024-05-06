import React, { memo, useEffect, useState } from 'react'
import styles from './productPhotos.module.css';


function ProductPhotos({ imageURL1, imageURL2 }) {

  return (
    <div className={styles.container}>
      <div><img src={imageURL1} alt="Image" /></div>
      <div><img src={imageURL2} alt="Image" /></div>
    </div>
  )
}

export default memo(ProductPhotos)