import React, { memo } from "react";
import styles from "./footer.module.css";

function Footer() {
  const list1 = [
    "Contact Us",
    "Track Order",
    "Returns & Refunds",
    "FAQs",
    "My Account",
  ];
  const list2 = ["About Us", "Careers", "Community Initiatives", "DM Army"];
  const list3 = [
    "Terms & Conditions",
    "Privacy Policy",
    "Cookie Policy",
    "Security",
    "Sitemap",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.lists}>
        <ul className={styles.list}>
          <h3>NEED HELP</h3>
          {list1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className={styles.list}>
          <h3>COMPANY</h3>
          {list2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className={styles.list}>
          <h3>MORE INFO</h3>
          {list3.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.policy}>
        <div>
          <span>₹</span>
          <p>COD Available</p>
        </div>
        <div>
          <span>
            <i className="ri-loop-right-line"></i>
          </span>
          <p> 30 Days Easy Returns</p>
        </div>
      </div>
      <div className={styles.follow}>
        <i className="ri-facebook-fill"></i>
        <i className="ri-instagram-fill"></i>
        <i className="ri-snapchat-fill"></i>
        <i className="ri-twitter-fill"></i>
      </div>
      <div className={styles.copyright}>
        <i className="ri-copyright-line"></i>
        The DM Store 2024-25
      </div>
    </div>
  );
}

export default memo(Footer);
