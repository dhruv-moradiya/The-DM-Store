import React, { useEffect, useState } from "react";
import styles from "./filter.module.css";
import {
  categoryArray_female,
  categoryArray_kids,
  categoryArray_male,
  discountFilterData,
  priceFilterData,
  theme_kids,
  theme_men,
  theme_women,
} from "../../../../helpers/helpers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../context/Firebase";
function Filter({ filterData, setFilterData }) {
  const [whome, setWhome] = useState("male");
  const [category, setCategory] = useState("nothing");
  const [theme, setTheme] = useState("nothing");
  const [price, setPrice] = useState("nothing");
  const [discount, setDiscount] = useState("nothing");
  function categoryOptions() {
    switch (whome) {
      case "male":
        return categoryArray_male.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        });
      case "women":
        return categoryArray_female.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        });
      case "kids":
        return categoryArray_kids.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        });
      default:
        return [];
    }
  }
  function themeOptions() {
    switch (whome) {
      case "male":
        return theme_men.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        });
      case "women":
        return theme_women.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        });
      case "kids":
        return theme_kids.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        });
      default:
        return [];
    }
  }
  function filterDataFun() {
    function priceIndex(index) {
      switch (index) {
        case '1':
          return { minP: 0, maxP: 10000 };
        case '2':
          return { minP: 0, maxP: 500 };
        case '3':
          return { minP: 500, maxP: 1000 };
        case '4':
          return { minP: 1000, maxP: 2000 };
        case '5':
          return { minP: 2000, maxP: 2000 };

        default:
          break;
      }
    }
    function discountIndex(index) {
      switch (index) {
        case '1':
          return { minD: 0, maxD: 0 };
        case '2':
          return { minD: 0, maxD: 5 };
        case '3':
          return { minD: 5, maxD: 10 };

        default:
          break;
      }
    }
    async function sanpShot(q) {
      let FilData = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        FilData.push(doc.data());
      });
      setFilterData(FilData)
    }
    try {
      const productRef = collection(db, "products");
      let q;
      if (category !== "nothing") {
        if (theme !== "nothing") {
          // Filter by category and theme
          q = query(
            productRef,
            where("forWhome", "==", whome),
            where("category", "==", category),
            where("theme", "==", theme)
          );
          sanpShot(q)
        } else {
          // Filter by category only
          q = query(
            productRef,
            where("forWhome", "==", whome),
            where("category", "==", category)
          );
          sanpShot(q)
        }
      } else if (theme !== "nothing") {
        // Filter by theme only
        q = query(
          productRef,
          where("forWhome", "==", whome),
          where("theme", "==", theme)
        );
        sanpShot(q)
      } else if (price !== "nothing") {
        // Filter by price range
        const { min, max } = priceIndex(price);
        if (min !== undefined && max !== undefined) {
          q = query(
            productRef,
            where("forWhome", "==", whome),
            where("price", ">=", min),
            where("price", "<=", max)
          );
          sanpShot(q)
        }
      }


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    filterDataFun();
  }, [whome, category, theme, price]);

  return (
    <form className={styles.container}>
      <div>
        <label htmlFor="whome">For whome: </label>
        <select
          name="whome"
          id="whome"
          onChange={(e) => setWhome(e.target.value)}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="nothing">Nothing</option>
          {categoryOptions()}
        </select>
      </div>
      <div>
        <label htmlFor="theme">Theme: </label>
        <select
          name="theme"
          id="theme"
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="nothing">Nothing</option>
          {themeOptions()}
        </select>
      </div>
      <div>
        <label htmlFor="price">Price: </label>
        <select
          name="price"
          id="price"
          onChange={(e) => setPrice(e.target.value)}
        >
          {priceFilterData.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="discount">Discount: </label>
        <select
          name="discount"
          id="discount"
          onChange={(e) => setDiscount(e.target.value)}
        >
          {discountFilterData.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit">Filter</button>
    </form>
  );
}

export default Filter;
