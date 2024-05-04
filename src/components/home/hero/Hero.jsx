import React, { memo } from "react";
import styles from "./hero.module.css";
import SlickSlider from "../../common/slider/SlickSlider";
import { useClothContext } from "../../../context/ClothContext";

function Hero() {
  const { section } = useClothContext();
  function getImages() {
    switch (section) {
      case "MEN":
        return [
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Plaid-Shirts-Offer-Campaign_HomePage-Banner_1.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_oversized_t-shirt_bif_vive_big_print.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-Banner_11.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Polo-799-homepage.jpg?format=webp&w=1500&dpr=1.3",
        ];
      case "WOMEN":
        return [
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage--Banner_NMGIp8B.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-banner_17.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_Banner_copy_1.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/One_Piece_Homepage_Banner_copy_BqOonxu.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Web-banner_24.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-Banner_15_7Ioswgq.jpg?format=webp&w=1500&dpr=1.3",
        ];
      case "KIDS":
        return [
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web-banner_nwuMPZV.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/web-banner_1_Wb8eQNg.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-Banner_copy_ey95Xfg.jpg?format=webp&w=1500&dpr=1.3",
          "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Kids_Bottoms_Homepage_Banner_New.jpg?format=webp&w=1500&dpr=1.3",
        ];
      default:
        return [];
    }
  }
  return (
    <>
      <SlickSlider slidesToShow={1} play={true} speed={400} infinite={true}>
        {getImages().map((item, index) => {
          return (
            <div key={index} className={styles.heroImage}>
              <img src={item} alt="Hero" />
            </div>
          );
        })}
      </SlickSlider>
    </>
  );
}

export default memo(Hero);
