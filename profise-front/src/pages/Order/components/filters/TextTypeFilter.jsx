/* eslint-disable react/prop-types */
import React from "react";

import Buttons from "../Buttons";

const TextTypeFilter = ({
  categoryToFilter,
  errorExists,
  errorMessage,
  actualFilterValue,
  handleText,
}) => {
  return (
    <>
      <h2 className="order__container__filter-container__box__category-wrapper__question">
        {categoryToFilter.subCategory[0].category}
      </h2>
      <input
        type="text"
        name="input"
        id={categoryToFilter.subCategory[0].slug.replace("/", "")}
        value={actualFilterValue}
        onChange={handleText}
        autoComplete="off"
        autoCorrect="off"
        placeholder="Digite aqui..."
        className="order__container__filter-container__box__category-wrapper__text-input"
      />

      {errorExists && (
        <span className="order__container__filter-container__box__category-wrapper__error-message">
          {errorMessage}
        </span>
      )}

      {/* <Buttons indexPage={indexPage} handleBackBtn={handleBackBtn} handleNextBtn={handleNextBtn} disabled={disabled} /> */}
    </>
  );
};

export default TextTypeFilter;
