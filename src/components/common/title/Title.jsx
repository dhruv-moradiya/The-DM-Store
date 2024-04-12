import React from 'react'
import styles from './title.module.css'

function Title({ title }) {
  return (
    <div className={styles.container}>
      <h2>{title.toUpperCase()}</h2>
    </div>
  )
}

export default Title