import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { getDropDownItems } from "./navHelper";
import { useClothContext } from "../../context/ClothContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../context/Firebase";
// || (section === 'KIDS' && item === 'BOY' && item === 'GIRL')
function Navbar() {
  const [inputExpand, setInputExpand] = useState(false);
  const { section, setSection, currentUser, cartItems } = useClothContext();
  const [sideBarOpen, setSideBarOpen] = useState(false);
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
        navigate("/login");
        console.log("Sign-out successful.");
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
      <NavbarTopForMobile navigate={navigate} setSideBarOpen={setSideBarOpen} cartItems={cartItems} />
      <MobileSideBar
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        currentUser={currentUser}
        logOutUser={logOutUser}
        categoryArray={categoryArray}
        section={section}
        getDropDownItems={getDropDownItems}
      />

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
        <ul className={`${styles.icons} ${styles.mobileIcons}`}>
          <li
            className={styles.serchPart}
            onMouseOver={() => setInputExpand(true)}
            onMouseLeave={() => setInputExpand(false)}
          >
            <input
              type="text"
              placeholder="Search"
              className={inputExpand ? styles.expandInput : ""}
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
          <li className={styles.cartBag}
            onClick={function () {
              navigate("/order");
            }}
          >
            <i className="ri-handbag-line"></i>
            <div className={styles.cartItemNum}>{cartItems?.length}</div>
          </li>
        </ul>
      </div>
      <NavBottomContainerMobile section={section} setSection={setSection} />
    </nav>
  );
}

export default Navbar;

// Components for NavBar

function NavbarTopForMobile({ navigate, setSideBarOpen, cartItems }) {
  function iconsRender() {
    return (
      <ul className={styles.navTopMobile}>
        <li
          onClick={function () {
            navigate("/likedProducts");
          }}
        >
          <i className="ri-heart-3-line"></i>
        </li>
        <li className={styles.cartBag}
          onClick={function () {
            navigate("/order");
          }}
        >
          <i className="ri-handbag-line"></i>
          <div className={styles.cartItemNum}>{cartItems?.length}</div>
        </li>
      </ul>
    );
  }
  return (
    <div className={`${styles.navTopMobile}`}>
      <button onClick={() => setSideBarOpen(true)}>
        <i className="ri-menu-line"></i>
      </button>
      <h2>The Dm Store</h2>
      {iconsRender()}
    </div>
  );
}

function MobileSideBar({
  sideBarOpen,
  setSideBarOpen,
  logOutUser,
  categoryArray,
  section,
  getDropDownItems,
  currentUser,
}) {
  return (
    <div
      className={`${styles.mobileSideBar} ${sideBarOpen ? styles.showSideBar : ""
        }`}
    >
      <div className={styles.photo_Btn}>
        <div className={styles.userPhoto}>
          <img src={currentUser.photoURL} alt="User" />
        </div>
        <button className={styles.logoutBtn} onClick={logOutUser}>
          LogOut
        </button>
      </div>
      <input type="text" placeholder="Search" />
      <ul>
        {categoryArray.map((item, index) => {
          const dropDownItems = getDropDownItems(item, section);
          return (
            <li key={index}>
              <div className={styles.innerCategoryName}>
                <p>{item}</p>
                {/* {item !== "SNEAKERS" && item !== "BOY" && item !== "GIRL" && (
              <i className="ri-arrow-down-s-line"></i>
            )} */}
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
      <button className={styles.closeBtn} onClick={() => setSideBarOpen(false)}>
        <i className="ri-close-fill"></i>
      </button>
    </div>
  );
}

function NavBottomContainerMobile({ section, setSection }) {
  return <div className={styles.navBottomContainerMobile}>
    {["MEN", "WOMEN", "KIDS"].map((item, index) => {
      return (
        <button
          key={index}
          className={section === item ? styles.activeCategotyTab : ""}
          onClick={() => setSection(item)}
        >
          {item}
        </button>
      );
    })}
  </div>
}