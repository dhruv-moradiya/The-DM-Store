import React from "react";
import styles from "./sideBar.module.css";
import { useClothContext } from "../../../context/ClothContext";

function SideBar() {
  const { section } = useClothContext();
  const size = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const kidsSize = ["0-1Y", "1-3Y", "3-5Y", "5-7Y", "7-12Y"];
  const price = ['Rs.500 To Rs.1000', 'Rs.1000 To Rs.1500', 'Rs.1500 To Rs.2000', 'Rs.2000 To Rs.2500']
  const themes = [
    "Batman",
    "Black Penther",
    "Rick and Morxy",
    "Harry Porter",
    "Peanuts",
    "Spider Man",
    "Naruto",
    "One Piece",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.filterType}>
        <h3>THEMES</h3>
        <input type="text" placeholder="Search for Themes" />
        <div className={styles.themeButtons}>
          {themes.map((item, index) => {
            return (
              <div key={index} className={styles.themeButton}>
                <input type="checkbox" id={item} />
                <label htmlFor={item}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.filterType}>
        <h3>SIZE</h3>
        <input type="text" placeholder="Search for Size" />
        <ul className={styles.size}>
          {section !== "KIDS"
            ? size.map((item, index) => {
              return <li key={index}>{item}</li>;
            })
            : kidsSize.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
        </ul>
      </div>
      <div className={styles.filterType}>
        <h3>PRICES</h3>
        <ul className={styles.price}>
          {price.map((item, index) => {
            return <li key={index}>
              <input type="radio" id={item} />
              <label htmlFor={item}>{item}</label>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
