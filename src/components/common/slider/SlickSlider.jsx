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
    // responsive: slidesToShow,
  };
  return (
    <Slider {...settings} style={{ width: "100%" }}>
      {children}
    </Slider>
  );
}

export default SlickSlider;
