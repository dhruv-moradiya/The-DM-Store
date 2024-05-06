import React from "react";
import styles from "./loader.module.css";

function Loader({
  size = "20px",
  color = "inherit",
  containerWidth,
  containerHeight,
}) {
  return (
    <div
      className={styles.container}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <div
        className={styles.icon}
        style={{ width: size, height: size, color }}
      ></div>
    </div>
  );
}

export default Loader;
