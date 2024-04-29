import React, { memo, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { getDropDownItems } from "./navHelper";
import { useClothContext } from "../../context/ClothContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../context/Firebase";
import SearchBox from "./searchBox/SearchBox";
import {
  categoryArray_female,
  categoryArray_kids,
  categoryArray_male,
} from "../../helpers/helpers";
import { fanDomData } from "../../components/home/collection/getCollecationData";
import { merchandiseData } from "../../components/home/merchandise/merchandiseData";
// || (section === 'KIDS' && item === 'BOY' && item === 'GIRL')
function Navbar() {
  const { allProductData } = useClothContext();
  const [showSearchedItems, setShowSearchedItems] = useState(null);
  const [searchInputFilde, setSearchInputFilde] = useState("");
  const [inputExpand, setInputExpand] = useState(false);
  const { section, setSection, currentUser, cartItems } = useClothContext();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
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

  function searchedItemBoxVisible(e) {
    // setShowSearchedItems(true);
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
    console.log(temp);
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
          <li
            className={styles.cartBag}
            onClick={function () {
              navigate("/order");
            }}
          >
            <i className="ri-handbag-line"></i>
            <div className={styles.cartItemNum}>{cartItems?.length}</div>
          </li>
          {showSearchedItems && (
            <SearchBox showSearchedItems={showSearchedItems} setShowSearchedItems={setShowSearchedItems} setSearchInputFilde={setSearchInputFilde} />
          )}
        </ul>
      </div>

      <NavBottomContainerMobile section={section} setSection={setSection} />
    </nav>
  );
}

export default memo(Navbar);

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
        <li
          className={styles.cartBag}
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
  return (
    <div className={styles.navBottomContainerMobile}>
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
  );
}

function NavBottomContainer({ categoryArray, getDropDownItems, section }) {

  function dropDownItemsContainer(item, dropDownItems) {

    //😎😎😎 Some Info 😎😎😎
    // item is [TOPWEAR, BOTTOMWEAR, etc]
    // dropDownItems is [T-SHIRTS, SHIRTS, CARGO ...] it is a array

    function getPath(dropItem) {
      const path =
        item === "THEMES"
          ? `${`merchndise-${dropDownItemsNavigation(item, dropItem)}`}`
          : `${`Category_${section.toLowerCase()}-${dropDownItemsNavigation(item, dropItem)}`}`;

      return path
    }

    return (
      <>
        {item !== "SNEAKERS" && (
          <ul className={styles.innerCategory}>
            {dropDownItems.map((dropItem, index) => {
              return (
                <Link key={index} to={getPath(dropItem)}>
                  <li>{dropItem}</li>
                </Link>
              );
            })}
          </ul>
        )}
      </>
    );
  }

  function dropDownItemsNavigation(dropDownCategory, dropDownItem) {
    const categoryArray = {
      MEN: categoryArray_male,
      WOMEN: categoryArray_female,
      KIDS: categoryArray_kids,
    };

    const dropDownThemeData = {
      MEN: fanDomData(section),
      WOMEN: merchandiseData(section),
      KIDS: merchandiseData(section),
    };

    const whichNavigation =
      dropDownCategory === "THEMES" ? dropDownThemeData : categoryArray;

    const categoryId = whichNavigation[section].find(
      (item) => item.name === dropDownItem
    );
    return categoryId?.id || 1;
  }
  console.log('NavBottomContainer')

  return (
    <div className={styles.navBottomContainer}>
      <ul className={styles.navBottom}>
        {categoryArray.map((item, index) => {
          const dropDownItems = getDropDownItems(item, section);
          return (
            <li key={index}>
              <div className={styles.innerCategoryName}>
                {item === "SNEAKERS" ? (
                  <Link to={"Category_men-3"}>
                    <p>{item}</p>
                  </Link>
                ) : (
                  <p>{item}</p>
                )}

                {item !== "SNEAKERS" && item !== "BOY" && item !== "GIRL" && (
                  <i className="ri-arrow-down-s-line"></i>
                )}
              </div>
              {dropDownItemsContainer(item, dropDownItems)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
