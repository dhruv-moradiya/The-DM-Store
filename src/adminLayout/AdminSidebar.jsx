import React from 'react'
import styles from './adminSidebar.module.css'
import { Link } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className={styles.container}>
      <ul>
        <li><Link to={'/admin'}><i className="ri-shape-2-fill"></i>Dashborad</Link></li>
        <li><Link to={'/admin/users'}><i className="ri-user-4-fill"></i>users</Link></li>
        <li><Link to={'/admin/products'}><i className="ri-product-hunt-fill"></i>Products</Link></li>
      </ul>
    </div>
  )
}

export default AdminSidebar