import React from 'react'
import styles from './searchBox.module.css'

function SearchBox({ showSearchedItems }) {
  return <div className={styles.container}>

    {showSearchedItems.map((item, index) => {
      return <div className={styles.innerContainer} key={index}>
        <div className={styles.image}>
          <img src={item.imageURL1} alt={item.name} />
        </div>
        <div className={styles.content}>
          <p> {item.name}</p>
          <p>{item.category}</p>
          <p>₹{item.price}</p>
        </div>
      </div>
    })}

  </div>

}

export default SearchBox