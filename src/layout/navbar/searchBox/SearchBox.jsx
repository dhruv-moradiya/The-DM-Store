import React, { memo } from 'react'
import styles from './searchBox.module.css'
import { useNavigate } from 'react-router-dom'


function SearchBox({ showSearchedItems, setShowSearchedItems, setSearchInputFilde }) {
  const navigate = useNavigate()

  function redirection(category, id) {
    navigate(`/${category}/${id}`)
    setShowSearchedItems(null)
    setSearchInputFilde("")
  }
  return <div className={styles.container}>

    {showSearchedItems.map((item, index) => {
      return <div className={styles.innerContainer} key={index} onClick={() => redirection(item.category, item.id)}>
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

export default memo(SearchBox)