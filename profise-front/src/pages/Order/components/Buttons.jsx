/* eslint-disable react/prop-types */
import React from "react";

const Buttons = ({
  indexPage,
  handleBackBtn,
  handleNextBtn,
  disabled,
  finalStep = false,
  handleFinishBtn,
}) => {
  return (
    <div className="order__container__filter-container__box__button-wrapper">
      {indexPage > 0 && (
        <button
          type="button"
          onClick={handleBackBtn}
          disabled={disabled}
          className="order__container__filter-container__box__button-wrapper__back-btn"
        >
          Voltar
        </button>
      )}
      {!finalStep && (
        <button
          type="button"
          onClick={handleNextBtn}
          disabled={disabled}
          className="order__container__filter-container__box__button-wrapper__next-btn"
        >
          Próximo
        </button>
      )}
      {finalStep && (
        <button
          type="button"
          onClick={handleFinishBtn}
          disabled={disabled}
          className="order__container__filter-container__box__button-wrapper__next-btn"
        >
          Finalizar
        </button>
      )}
    </div>
  );
};

export default Buttons;
