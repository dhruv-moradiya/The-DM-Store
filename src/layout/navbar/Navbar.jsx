import React, { memo, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { getDropDownItems } from "./navHelper";
import { useClothContext } from "../../context/ClothContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../context/Firebase";
import SearchBox from "./searchBox/SearchBox";
import NavBottomContainer from "./navComponents/NavBottomContainer";
import NavBottomContainerMobile from "./navComponents/NavBottomContainerMobile";
import MobileSideBar from "./navComponents/MobileSideBar";
import NavbarTopForMobile from "./navComponents/NavbarTopForMobile";
// || (section === 'KIDS' && item === 'BOY' && item === 'GIRL')
function Navbar() {
  const { allProductData } = useClothContext();
  const [showSearchedItems, setShowSearchedItems] = useState(null);
  const [searchInputFilde, setSearchInputFilde] = useState("");
  const [inputExpand, setInputExpand] = useState(false);
  const { section, setSection, currentUser, setCurrentUser, cartItems } = useClothContext();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (section === "MEN") {
      setCategoryArray(["TOPWEAR", "BOTTOMWEAR", "SNEAKERS", "THEMES"]);
    } else if (section === "WOMEN") {
      setCategoryArray(["TOPWEAR", "BOTTOMWEAR"]);
    } else {
      setCategoryArray(["BOY", "GIRL", "THEMES"]);
    }
  }, [section]);

  function handleClick() {
    const user = JSON.parse(localStorage.getItem("DMStore_User"));

    if (user.email === import.meta.env.VITE_APP_ADMIN_EMAIL_NAME) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }

  function logOutUser() {
    signOut(auth)
      .then(() => {
        setCurrentUser(null)
        navigate("/login");
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  }

  function redirectHome() {
    navigate("/");
  }

  function searchedItemBoxVisible(e) {
    setSearchInputFilde(e.target.value);
  }

  function filterProducts() {
    if (!allProductData || !searchInputFilde) return null;
    const temp = [];
    const searchInputLower = searchInputFilde.toLowerCase();

    for (const item of allProductData) {
      const itemName = item.name.toLowerCase();
      const itemCategory = item.category.toLowerCase();

      if (
        itemName.includes(searchInputLower) ||
        itemCategory.includes(searchInputLower)
      ) {
        if (!temp.find((value) => value.id === item.id)) {
          temp.push(item);
        }
      }
    }
    setShowSearchedItems(temp);
  }

  useEffect(() => {
    filterProducts();
  }, [searchInputFilde]);

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
      <NavbarTopForMobile
        navigate={navigate}
        setSideBarOpen={setSideBarOpen}
        cartItems={cartItems}
      />
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
        <NavBottomContainer
          categoryArray={categoryArray}
          getDropDownItems={getDropDownItems}
          section={section}
        />
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
              value={searchInputFilde}
              onChange={searchedItemBoxVisible}
            />
            <i className="ri-search-line"></i>
          </li>
          <li className={styles.userPhoto} onClick={handleClick}>
            <img src={currentUser.photoURL} alt="User" />
          </li>
          <li
            onClick={function () {
              navigate("/likedProducts");
            }}
          >
            <i className="ri-heart-3-line"></i>
          </li>
          <li
            className={styles.cartBag}
            onClick={function () {
              navigate("/order");
            }}
          >
            <i className="ri-handbag-line"></i>
            <div className={styles.cartItemNum}>{cartItems?.length}</div>
          </li>
          <li
            onClick={function () {
              navigate("/myorder");
            }}
          >
            <i className="ri-red-packet-fill"></i>
          </li>
          <li className={styles.logOutBtn}>
            <button onClick={logOutUser}>LogOut</button>
          </li>
          {showSearchedItems && (
            <SearchBox
              showSearchedItems={showSearchedItems}
              setShowSearchedItems={setShowSearchedItems}
              setSearchInputFilde={setSearchInputFilde}
            />
          )}
        </ul>
      </div>

      <NavBottomContainerMobile section={section} setSection={setSection} />
    </nav>
  );
}

export default memo(Navbar);
