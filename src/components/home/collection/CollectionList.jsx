import React, { memo } from "react";
import styles from "./collection.module.css";
import Title from "../../common/title/Title";
import CollectionCard from "./CollectionCard";
import SlickSlider from "../../common/slider/SlickSlider";
import { collectionData } from "./getCollecationData";
import { useClothContext } from "../../../context/ClothContext";


function CollectionList({ title }) {
  const { section } = useClothContext();


  return (
    <div className={styles.container}>
      {title && <Title title="collection" />}
      <SlickSlider slidesToShow={3} speed={300} play={false} infinite={false}>
        {collectionData(section).map((item, index) => {
          return <CollectionCard src={item.src} id={item.id} key={index} />;
        })}
      </SlickSlider>
    </div>
  );
}

export default memo(CollectionList);
