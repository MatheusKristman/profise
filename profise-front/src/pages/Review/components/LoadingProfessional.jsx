/* eslint-disable react/prop-types */

import React from "react";

import images from "../../../assets";

function LoadingProfessional({ isAnimationActive }) {
  return (
    <div
      className={
        isAnimationActive
          ? "loading-categories-overlay active"
          : "loading-categories-overlay desactive"
      }
    >
      <div className="loading-categories-overlay__container">
        <h3 className="loading-categories-overlay__container__title">
          Carregando Informações...
        </h3>

        <div className="loading-categories-overlay__container__image-box">
          <img
            src={images.loadingAnimation}
            alt="Carregando..."
            className="loading-categories-overlay__container__image-box__image"
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingProfessional;
