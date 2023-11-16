import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import images from "../../../assets";

const state = {
  responsive: {
    0: {
      dotsEach: 1,
      items: 1,
    },
    600: {
      dotsEach: 2,
      items: 2,
    },
    768: {
      dotsEach: 3,
      items: 3,
    },
    1024: {
      dotsEach: 4,
      items: 4,
    },
  },
};

const isMobile = window.innerWidth < 1024;

function TopPro() {
  return (
    <section className="top-pro wrapper">
      <div className="top-pro__container">
        <h2 className="top-pro__container__title">
          Top Profissionals Registrados
        </h2>

        <p className="top-pro__container__desc">
          Alguns dos profissionais que ajudamos a recrutar ao longo dos anos.
        </p>

        <div className="top-pro__container__wrapper">
          <OwlCarousel
            loop
            responsive={state.responsive}
            autoplay={isMobile}
            autoplayTimeout={10000}
            smartSpeed={500}
            dots
            className="owl-theme"
            margin={25}
          >
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro1}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Udemy</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro2}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Stripe</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro3}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Dropbox</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro4}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Figma</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro1}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Udemy</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro2}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Stripe</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro3}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Dropbox</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro4}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Figma</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro1}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Udemy</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro2}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Stripe</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro3}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Dropbox</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
            <div className="item">
              <div className="top-pro-box">
                <div className="top-pro-box-image-box">
                  <img
                    src={images.topPro4}
                    alt="Profissional"
                    className="top-pro-box-image"
                  />
                </div>

                <h5 className="top-pro-box-title">Dropbox</h5>

                <span className="top-pro-box-address">London, UK</span>

                <button type="button" className="top-pro-box-btn">
                  Button
                </button>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
}

export default TopPro;
