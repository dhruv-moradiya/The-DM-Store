import styles from '../navbar.module.css'

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
export default NavbarTopForMobile;