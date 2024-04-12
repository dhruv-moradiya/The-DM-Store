import React from "react";
import styles from "./loader.module.css";

function Loader({ size = "20px", color = "inherit" }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon} style={{ width: size, height: size, color }}>

      </div>
    </div>
  );
}

export default Loader;
