import React from 'react'
import styles from './userList.module.css'

function UserList() {
  return (
    <div className={styles.container}>
      <h3>User list</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User photo</th>
            <th>User name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone no.</th>
            <th>Email</th>
            <th>Join date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td ><div className={styles.imageTD}><img src="https://images.unsplash.com/photo-1711638753947-7a9bb63d6bb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D" alt="" /></div></td>
            <td>Dhruv</td>
            <td>Male</td>
            <td>26</td>
            <td>+91 99002 25732</td>
            <td>dhruv@gmail.com</td>
            <td>October 25, 2021</td>
          </tr>
          <tr>
            <td ><div className={styles.imageTD}><img src="https://images.unsplash.com/photo-1711638753947-7a9bb63d6bb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D" alt="" /></div></td>
            <td>Dhruv</td>
            <td>Male</td>
            <td>26</td>
            <td>+91 99002 25732</td>
            <td>dhruv@gmail.com</td>
            <td>October 25, 2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UserList