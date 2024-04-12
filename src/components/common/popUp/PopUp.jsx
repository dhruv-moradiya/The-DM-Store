import React from "react";
import styles from "./popUp.module.css";

function PopUp({ message, status = "default", isVisible, hidePopOver }) {
  const statusMap = {
    info: { icon: <i className="ri-information-fill"></i>, color: "#2196f3" },
    success: {
      icon: <i className="ri-check-double-line"></i>,
      color: "#4caf50",
    },
    warning: {
      icon: <i className="ri-error-warning-fill"></i>,
      color: "#ffb300",
    },
    error: { icon: <i className="ri-close-fill"></i>, color: "#f44336" },
    default: {
      icon: <i className="ri-information-fill"></i>,
      color: "#009688",
    },
  };

  if (isVisible) {
    setTimeout(hidePopOver, 5000);
  }

  return (
    <div
      className={`${styles.popOverContainer}  ${isVisible ? styles.visible : ""
        }`}
      style={{ borderColor: statusMap[status].color }}
    >
      <div className={styles.messageContainer}>
        <div style={{ color: statusMap[status].color }}>
          {statusMap[status].icon}
        </div>
        {message}
      </div>
    </div>
  );
}

export default PopUp;
