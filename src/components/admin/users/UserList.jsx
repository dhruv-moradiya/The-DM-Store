import React from "react";
import styles from "./userList.module.css";
import { capitalize, getDate } from "../products/form/helper";

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
            if (item.email !== import.meta.env.VITE_APP_ADMIN_EMAIL_NAME) {
              return (
                <tr key={index}>
                  <td>
                    <div className={styles.imageTD}>
                      <img src={item.photoURL} alt={item.displayName} />
                    </div>
                  </td>
                  <td>
                    <p className={styles.heading}>{item.displayName}</p>
                  </td>
                  <td>
                    <p>{capitalize(item.gender)}</p>
                  </td>
                  <td>
                    <p>{item.age}</p>
                  </td>
                  <td>
                    <p className={styles.heading}>+91 {item.phoneNo}</p>
                  </td>
                  <td>
                    <p>{item.email}</p>
                  </td>
                  <td>
                    <p className={styles.heading}>{getDate(item.time.seconds)}</p>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
