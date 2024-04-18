import React from "react";
import styles from "./productCard.module.css";
import Title from "../title/Title";
import ProductCard from "./ProductCard";
import SlickSlider from "../slider/SlickSlider";

function ProductList({ title, allProductData }) {
  const data = allProductData?.slice(0, 8)
  return (
    <div className={styles.container}>
      {title && <Title title="TOP SELLING" />}
      <SlickSlider slidesToShow={4} play={false} speed={300}>
        {data?.map((item, index) => {
          return (
            <ProductCard
              key={index}
              id={item.id}
              image={item.imageURL1}
              name={item.name}
              category={item.category}
              price={item.price}
            />
          );
        })}
      </SlickSlider>
    </div>
  );
}

export default ProductList;
