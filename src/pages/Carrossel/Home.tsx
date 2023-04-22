import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe o CSS
import { ContainerItem, ContainerTrofeus } from "./style";

interface SliderProps {
  autor: string;
  post: string;
}

interface ProjetoProps {
  slides: SliderProps[];
}

const ImageSlider: React.FC<ProjetoProps> = ({ slides }) => {
  return (
    <div
      style={{
        width: "100%",
        border: "2px solid green"
      }}
    >
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}

        centerMode
        centerSlidePercentage={60}
      >
        {slides.map((slide, index) => (
          <ContainerTrofeus
            key={index}
          >
            <h3>{slide.autor}</h3>
            <h4>{slide.post}</h4>
          </ContainerTrofeus>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
