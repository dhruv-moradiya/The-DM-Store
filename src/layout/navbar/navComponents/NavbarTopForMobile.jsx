import { useEffect, useState } from "react";
import styles from "../navbar.module.css";
import { useNavigate } from "react-router-dom";

function NavbarTopForMobile({
  navigate,
  setSideBarOpen,
  cartItems,
  allProductData,
}) {
  const [openSearch, setOpenSearch] = useState(false);

  function showSeachBox() {
    setOpenSearch(true);
  }

  function iconsRender() {
    return (
      <ul className={styles.navTopMobile}>
        <li onClick={showSeachBox}>
          <i className="ri-search-line"></i>
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
      {openSearch && (
        <SearchBox
          allProductData={allProductData}
          setOpenSearch={setOpenSearch}
        />
      )}
    </div>
  );
}
export default NavbarTopForMobile;

function SearchBox({ setOpenSearch, allProductData }) {
  const [searchInputFilde, setSearchInputFilde] = useState("");
  const [showSearchedItems, setShowSearchedItems] = useState(null);

  function hideSeachBox() {
    setOpenSearch(false);
  }

  const navigate = useNavigate();

  function redirection(category, id) {
    navigate(`/${category}/${id}`);
    setShowSearchedItems(null);
    setSearchInputFilde("");
    setOpenSearch(false);
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
  return (
    <div className={styles.backGround}>
      <input
        type="text"
        value={searchInputFilde}
        onChange={(e) => setSearchInputFilde(e.target.value)}
      />
      {showSearchedItems && (
        <div className={styles.productList}>
          {showSearchedItems.map((item, index) => {
            return (
              <div
                className={styles.innerContainer}
                key={index}
                onClick={() => redirection(item.category, item.id)}
              >
                <div className={styles.image}>
                  <img src={item.imageURL1} alt={item.name} />
                </div>
                <div className={styles.content}>
                  <p> {item.name}</p>
                  <p>{item.category}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={hideSeachBox}>&times;</button>
    </div>
  );
}
