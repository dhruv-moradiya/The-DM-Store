import { Link } from 'react-router-dom';
import styles from '../navbar.module.css'
import DropDownItemsContainer from './DropDownItemsContainer';

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
                {item === "SNEAKERS" ? (
                  <Link to={"Category_men-3"}>
                    <p>{item}</p>
                  </Link>
                ) : (
                  <p>{item}</p>
                )}
              </div>
              {item !== "SNEAKERS" && (
                <DropDownItemsContainer item={item} dropDownItems={dropDownItems} />
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

export default MobileSideBar