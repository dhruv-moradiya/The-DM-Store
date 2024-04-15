import React from 'react'
import styles from './userList.module.css'

function UserList({ data }) {
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
          {data.map((item, index) => {
            if (item.email !== "gojo@gmail.com") {
              return (
                <tr key={index}>
                  <td ><div className={styles.imageTD}><img src={item.photoURL} alt={item.displayName} /></div></td>
                  <td>{item.displayName}</td>
                  <td>{item.gender}</td>
                  <td>{item.age}</td>
                  <td>+91 {item.phoneNo}</td>
                  <td>{item.email}</td>
                  <td>October 25, 2021</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList