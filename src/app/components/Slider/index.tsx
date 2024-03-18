import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; 
  width: 70%; 
  margin: auto;
`;

const SlideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <SliderContainer>
      <div style={{ width: "100%" }}>
        <Slider {...settings}>
        <div>
          <SlideImageContainer>
            <img
              src="https://images.unsplash.com/photo-1541596993953-970dd2ffdbdb?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              style={{ maxWidth: "100%", maxHeight: "80vh", width: "auto", height: "auto" }}
            />
          </SlideImageContainer>
        </div>
        <div>
          <SlideImageContainer>
            <img
              src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              style={{ maxWidth: "100%", maxHeight: "80vh", width: "auto", height: "auto" }}
            />
          </SlideImageContainer>
        </div>
        <div>
          <SlideImageContainer>
            <img
              src="https://images.unsplash.com/photo-1506617564039-2f3b650b7010?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              style={{ maxWidth: "100%", maxHeight: "80vh", width: "auto", height: "auto" }}
            />
          </SlideImageContainer>
        </div>
        </Slider>
      </div>
    </SliderContainer>
  );
}

export default SimpleSlider;
