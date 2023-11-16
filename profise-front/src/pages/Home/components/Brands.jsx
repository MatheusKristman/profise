/* eslint-disable react/jsx-no-bind */
import React from "react";
// eslint-disable-next-line no-unused-vars
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import image from "../../../assets/clients";

const state = {
  responsive: {
    0: {
      items: 1,
    },
    480: {
      items: 2,
    },
    600: {
      items: 3,
    },
    768: {
      items: 4,
    },
    1024: {
      items: 5,
    },
    1200: {
      items: 6,
    },
  },
};

function Brands() {
  const isMobile = window.innerWidth < 1024;

  return (
    <section className="brands wrapper">
      <OwlCarousel
        loop
        responsive={state.responsive}
        autoplay={isMobile}
        autoplayTimeout={10000}
        smartSpeed={500}
      >
        <div className="item">
          <a href="#" className="item-link">
            <img src={image.mencap} alt="Mencap" className="item-image" />
          </a>
        </div>
        <div className="item">
          <a href="#" className="item-link">
            <img src={image.shiseido} alt="Shiseido" className="item-image" />
          </a>
        </div>
        <div className="item">
          <a href="#" className="item-link">
            <img src={image.herbal} alt="Herbal" className="item-image" />
          </a>
        </div>
        <div className="item">
          <a href="#" className="item-link">
            <img src={image.nonstop} alt="Nonstop" className="item-image" />
          </a>
        </div>
        <div className="item">
          <a href="#" className="item-link">
            <img
              src={image.michaelPage}
              alt="Michael Page"
              className="item-image"
            />
          </a>
        </div>
        <div className="item">
          <a href="#" className="item-link">
            <img
              src={image.pagePersonnel}
              alt="Page Personnel"
              className="item-image"
            />
          </a>
        </div>
      </OwlCarousel>
    </section>
  );
}

export default Brands;
