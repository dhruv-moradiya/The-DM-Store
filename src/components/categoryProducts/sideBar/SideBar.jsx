import React, { useState } from "react";
import styles from "./sideBar.module.css";
import { useClothContext } from "../../../context/ClothContext";
import { merchandiseData } from "../../home/merchandise/merchandiseData";
import { fanDomData } from "../../home/collection/getCollecationData";
import { useNavigate } from "react-router-dom";

function SideBar({ category, productList, setFilterdProductList }) {
  const [selectedSizeBtn, setselectedSizeBtn] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const navigate = useNavigate();
  const { section } = useClothContext();
  const size = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const kidsSize = ["0-1Y", "1-3Y", "3-5Y", "5-7Y", "7-12Y"];
  const sneakerSize = ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"];

  const price = [
    { min: 500, max: 1000 },
    { min: 1000, max: 1500 },
    { min: 1500, max: 2000 },
    { min: 2000, max: 2500 },
    { min: 2500, max: 5000 },
  ];

  function themeNavigation(index) {
    console.log("first");
    navigate(`/merchndise-${index + 1}`);
  }

  function getThemes() {
    switch (section) {
      case "MEN":
        return fanDomData(section);
      case "WOMEN":
      case "KIDS":
        return merchandiseData(section);
      default:
        break;
    }
  }

  function sizeRendering(onlySizeList) {
    const getSizeList = () => {
      if (section === "KIDS") {
        return kidsSize;
      }

      if (category === "Category_men-3") {
        return sneakerSize;
      }

      return size;
    };

    const sizeList = getSizeList();

    if (onlySizeList) return sizeList;
    return (
      <ul className={styles.size}>
        {sizeList.map((item, index) => (
          <li
            key={index}
            className={selectedSizeBtn === index ? styles.selectedSizeBtn : ""}
            onClick={function () {
              setselectedSizeBtn(index);
              setFilterdProductList(
                filterdData(item, selectedPrice ? selectedPrice : undefined)
              );
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  //Start FilterdProductList ----------------------------------

  const filterdData = (size = undefined, price = undefined) => {
    console.log("inFun: ", price);

    if (size && price)
      return productList.filter(
        (item) =>
          item.chekedCheckBox.find((value) => value === size) === size &&
          item.price >= price.min &&
          item.price <= price.max
      );

    if (size)
      return productList?.filter(
        (item) => item.chekedCheckBox.find((value) => value === size) === size
      );

    if (price)
      return productList?.filter(
        (item) => item.price >= price.min && item.price <= price.max
      );
  };

  function removeFilter() {
    setFilterdProductList(null)
    setSelectedPrice(null)
    setselectedSizeBtn(null)
  }

  console.log("selectedPrice", selectedPrice);
  console.log("selectedSizeBtn", selectedSizeBtn);

  //End FilterdProductList ------------------------------------

  return (
    <div className={styles.container}>
      {/* <div className={styles.filterType}>
        <h3>THEMES</h3>
        <input type="text" placeholder="Search for Themes" />
        <div className={styles.themeButtons}>
          {getThemes().map((item, index) => {
            return (
              <div key={index} className={styles.themeButton}>
                <input
                  type="radio"
                  id={item.name}
                  htmlFor="theme"
                  name="theme"
                  onChange={() => themeNavigation(index)}
                />
                <label htmlFor="theme" id="theme" name="theme">
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div> */}
      <button className={styles.removeFilterBtn} onClick={removeFilter}>Remove Filter</button>
      <div className={styles.filterType}>
        <h3>SIZE</h3>
        {/* <input type="text" placeholder="Search for Size" /> */}
        {sizeRendering()}
      </div>
      <div className={styles.filterType}>
        <h3>PRICES</h3>
        <ul className={styles.price}>
          {price.map((item, index) => {
            return (
              <li key={index}>
                <input
                  type="radio"
                  id="price"
                  name="price"
                  onClick={function () {
                    setSelectedPrice(item);
                    setFilterdProductList(
                      filterdData(
                        selectedSizeBtn
                          ? sizeRendering(true)[index]
                          : undefined,
                        price[index]
                      )
                    );
                  }}
                />
                <label htmlFor="price">{`₹${item.min} To ₹${item.max}`}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
