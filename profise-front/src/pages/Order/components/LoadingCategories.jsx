/* eslint-disable react/prop-types */
import React from "react";

import images from "../../../assets";
import useOrderStore from "../../../stores/useOrderStore";

function LoadingCategories({ isLoadingAnimationActive }) {
  return (
    <div
      className={
        isLoadingAnimationActive
          ? "loading-categories-overlay active"
          : "loading-categories-overlay desactive"
      }
    >
      <div className="loading-categories-overlay__container">
        <h3 className="loading-categories-overlay__container__title">
          Carregando...
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

export default LoadingCategories;
