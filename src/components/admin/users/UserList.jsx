import React from "react";
import styles from "./userList.module.css";

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
                    <p>{item.displayName}</p>
                  </td>
                  <td>
                    <p>{item.gender}</p>
                  </td>
                  <td>
                    <p>{item.age}</p>
                  </td>
                  <td>
                    <p>+91 {item.phoneNo}</p>
                  </td>
                  <td>
                    <p>{item.email}</p>
                  </td>
                  <td>
                    <p>October 25, 2021</p>
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
