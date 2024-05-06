import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextButton, PrevButton } from "./Button";

function SlickSlider({
  children,
  slidesToShow = 4,
  play = false,
  speed = 300,
  infinite = false,
}) {
  function getResponsiveProps() {
    if (slidesToShow === 3) {
      return [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
      ];
    } else if (slidesToShow === 4) {
      return [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
      ];
    } else if (slidesToShow === 5) {
      return [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 740,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
      ];
    }
  }

  function trySome() {
    console.log("slidesToShow in trySome:", slidesToShow); // Confirm the value of slidesToShow
    switch (slidesToShow) {
      case 5:
        return [
          {
            breakpoint: 1440,
            settings: { slidesToShow: 5, slidesToScroll: 5, infinite: false, dots: false },
          },
          {
            breakpoint: 1250,
            settings: { slidesToShow: 4, slidesToScroll: 4, infinite: false, dots: false },
          },
          {
            breakpoint: 1000,
            settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false, dots: false },
          },
          {
            breakpoint: 740,
            settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false, dots: false },
          },
          {
            breakpoint: 540,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, dots: false },
          },
        ];
      case 4:
        return [
          {
            breakpoint: 1440,
            settings: { slidesToShow: 4, slidesToScroll: 4, infinite: false, dots: false },
          },
          {
            breakpoint: 1250,
            settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false, dots: false },
          },
          {
            breakpoint: 1000,
            settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false, dots: false },
          },
          {
            breakpoint: 640,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, dots: false },
          },
        ];
      case 3:
        return [
          {
            breakpoint: 1440,
            settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false, dots: false },
          },
          {
            breakpoint: 1250,
            settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false, dots: false },
          },
          {
            breakpoint: 1000,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, dots: false },
          },
        ];
      default:
        return [];
    }
  }

  const responsive = trySome();

  console.log("slidesToShow", slidesToShow, trySome())
  const settings = {
    dots: false,
    infinite: infinite,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: play,
    autoplaySpeed: 2000,
    cssEase: "linear",
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    responsive: responsive,
  };
  return (
    <Slider {...settings} style={{ width: "100%" }}>
      {children}
    </Slider>
  );
}

export default SlickSlider;
