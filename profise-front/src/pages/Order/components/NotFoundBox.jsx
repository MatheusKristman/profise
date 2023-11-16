import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundBox = () => {
  const navigate = useNavigate();

  function handleNavigateHome() {
    navigate("/");
  }

  return (
    <div className="order__container__filter-container__box__not-found-wrapper">
      <div className="order__container__filter-container__box__not-found-wrapper__text-wrapper">
        <span className="order__container__filter-container__box__not-found-wrapper__text-wrapper__text">
          Ocorreu um erro, tente novamente
        </span>
      </div>

      <button
        type="button"
        onClick={handleNavigateHome}
        className="order__container__filter-container__box__not-found-wrapper__btn"
      >
        Voltar para início
      </button>
    </div>
  );
};

export default NotFoundBox;
