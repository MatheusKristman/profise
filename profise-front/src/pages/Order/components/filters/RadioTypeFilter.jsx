/* eslint-disable react/prop-types */
import React from "react";

import Buttons from "../Buttons";

const RadioTypeFilter = ({
  categoryToFilter,
  errorExists,
  errorMessage,
  handleRadio,
}) => {
  return (
    <>
      <h2 className="order__container__filter-container__box__category-wrapper__question">
        {categoryToFilter.subCategory[0].category}
      </h2>

      {categoryToFilter.subCategory[0].options.map((option) => (
        <div
          key={option}
          className="order__container__filter-container__box__category-wrapper__option-wrapper"
        >
          <input
            type="radio"
            name="option"
            id={option}
            value={option}
            onChange={handleRadio}
            autoComplete="off"
            autoCorrect="off"
            className="order__container__filter-container__box__category-wrapper__option-wrapper__option-input"
          />
          <label
            htmlFor={option}
            className="order__container__filter-container__box__category-wrapper__option-wrapper__option-label"
          >
            {option}
          </label>
        </div>
      ))}

      {errorExists && (
        <span className="order__container__filter-container__box__category-wrapper__error-message">
          {errorMessage}
        </span>
      )}

      {/* <Buttons indexPage={indexPage} handleBackBtn={handleBackBtn} handleNextBtn={handleNextBtn} disabled={disabled} /> */}
    </>
  );
};

export default RadioTypeFilter;
