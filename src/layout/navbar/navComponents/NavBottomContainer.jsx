import { memo } from 'react';
import styles from '../navbar.module.css'
import { Link } from 'react-router-dom';
import DropDownItemsContainer from './DropDownItemsContainer';

function NavBottomContainer({ categoryArray, getDropDownItems, section }) {

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

                {item !== "SNEAKERS" && (
                  <i className="ri-arrow-down-s-line"></i>
                )}
              </div>
              <DropDownItemsContainer item={item} dropDownItems={dropDownItems} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(NavBottomContainer);