import React from "react";
import styles from "./merchandise.module.css";
import MerchandiseCard from "./MerchandiseCard";
import SlickSlider from "../../common/slider/SlickSlider";
import { useClothContext } from "../../../context/ClothContext";
import { merchandiseData } from "./merchandiseData";
import Title from "../../common/title/Title";
import CollectionCard from "../collection/CollectionCard";
import { fanDomData } from "../collection/getCollecationData";

function MerchndiseList() {
  const { section } = useClothContext();
  return (
    <div className={styles.contanier}>
      {section !== "MEN" ? (
        <>
          <Title title='OFFICIAL MERCHANDISE' />
          <SlickSlider slidesToShow={5} play={false} speed={300} infinite={false}>
            {merchandiseData(section).map((item, index) => {
              return <MerchandiseCard key={index} src={item.src} id={item.id} />;
            })}
          </SlickSlider>
        </>
      ) : (
        <>
          <Title title="SHOP BY FANDOM" />
          <SlickSlider slidesToShow={3} speed={300} play={false} infinite={false}>
            {fanDomData(section).map((item, index) => {
              return <CollectionCard src={item.src} id={item.id} key={index} merchndise />;
            })}
          </SlickSlider>
        </>
      )}
    </div>
  );
}

export default MerchndiseList;
