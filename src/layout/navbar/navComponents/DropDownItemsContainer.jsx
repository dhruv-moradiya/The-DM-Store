import React from 'react'
import styles from '../navbar.module.css'
import { Link } from 'react-router-dom';
import { dropDownItemsNavigation } from '../navHelper';
import { useClothContext } from '../../../context/ClothContext';

function DropDownItemsContainer({ item, dropDownItems }) {

  const { section } = useClothContext()

  //😎😎😎 Some Info 😎😎😎
  // item is [TOPWEAR, BOTTOMWEAR, etc]
  // dropDownItems is [T-SHIRTS, SHIRTS, CARGO ...] it is a array

  function getPath(dropItem) {
    const path =
      item === "THEMES"
        ? `${`merchndise-${dropDownItemsNavigation(item, dropItem, section)}`}`
        : `${`Category_${section.toLowerCase()}-${dropDownItemsNavigation(item, dropItem, section)}`}`;

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

export default DropDownItemsContainer