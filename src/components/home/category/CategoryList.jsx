import React, { memo } from "react";
import styles from "./category.module.css";
import Title from "../../common/title/Title";
import CategoryCard from "./CategoryCard";
import { useClothContext } from "../../../context/ClothContext";
import { categoryImage, categoryName } from "./imageData";
import {
  categoryArray_female,
  categoryArray_kids,
  categoryArray_male,
} from "../../../helpers/helpers";

function CategoryList() {
  const { section } = useClothContext();

  function categoryName() {
    switch (section) {
      case "MEN":
        return categoryArray_male;
      case "WOMEN":
        return categoryArray_female;
      case "KIDS":
        return categoryArray_kids;

      default:
        return []
    }
  }
  return (
    <div className="container">
      <Title title="category" />
      <div className={styles.innerContainer}>
        {categoryImage(section).map((item, index) => {
          return (
            <CategoryCard
              key={index}
              src={item}
              categoryID={categoryName()[index].id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(CategoryList);
