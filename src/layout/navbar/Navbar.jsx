import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { getDropDownItems } from "./navHelper";
import { useClothContext } from "../../context/ClothContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../context/Firebase";
// || (section === 'KIDS' && item === 'BOY' && item === 'GIRL')
function Navbar() {
  const [inputExpand, setInputExpand] = useState(false);
  const { section, setSection, currentUser } = useClothContext();
  const [categoryArray, setCategoryArray] = useState([
    "STREETWEAR EDIT",
    "TOPWEAR",
    "BOTTOMWEAR",
    "SNEAKERS",
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    if (section === "MEN") {
      setCategoryArray(["TOPWEAR", "BOTTOMWEAR", "SNEAKERS", "THEMES"]);
    } else if (section === "WOMEN") {
      setCategoryArray(["TOPWEAR", "BOTTOMWEAR", "SHOES & ACCESSORIES"]);
    } else {
      setCategoryArray(["BOY", "GIRL", "THEMES"]);
    }
  }, [section]);

  function handleClick() {
    const user = JSON.parse(localStorage.getItem("DMStore_User"));

    if (user.email === "gojo@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }

  function logOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("/login");
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  }

  function redirectHome() {
    navigate("/");
  }

  if (!currentUser) return <h1>Loading....</h1>;
  return (
    <nav>
      <ul className={styles.navTop}>
        <h3 onClick={redirectHome}>The DM Store</h3>
        {["MEN", "WOMEN", "KIDS"].map((item, index) => {
          return (
            <li
              key={index}
              className={section === item ? styles.activeCategotyTab : ""}
              onClick={() => setSection(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>

      <div className={styles.navBottomContainer}>
        <ul className={styles.navBottom}>
          {categoryArray.map((item, index) => {
            const dropDownItems = getDropDownItems(item, section);
            return (
              <li key={index}>
                <div className={styles.innerCategoryName}>
                  <p>{item}</p>
                  {item !== "SNEAKERS" && item !== "BOY" && item !== "GIRL" && (
                    <i className="ri-arrow-down-s-line"></i>
                  )}
                </div>
                {item !== "SNEAKERS" && (
                  <ul className={styles.innerCategory}>
                    {dropDownItems.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <ul className={styles.icons}>
          <li
            className={styles.serchPart}
            onMouseOver={() => setInputExpand(true)}
            onMouseLeave={() => setInputExpand(false)}
          >
            <input
              type="text"
              placeholder="Search"
              className={inputExpand ? styles.expandInput : ''}
            />
            <i className="ri-search-line"></i>
          </li>
          <li className={styles.userPhoto} onClick={handleClick}>
            <img src={currentUser.photoURL} alt="User" />
          </li>
          <li className={styles.logOutBtn}>
            <button onClick={logOutUser}>LogOut</button>
          </li>
          <li
            onClick={function () {
              navigate("/likedProducts");
            }}
          >
            <i className="ri-heart-3-line"></i>
          </li>
          <li onClick={function () {
            navigate('/order')
          }}>
            <i className="ri-handbag-line"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
