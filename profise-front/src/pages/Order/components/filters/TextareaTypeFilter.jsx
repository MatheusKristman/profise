/* eslint-disable react/prop-types */
import React from "react";

import Buttons from "../Buttons";

const TextareaTypeFilter = ({
  categoryToFilter,
  errorExists,
  errorMessage,
  actualFilterValue,
  handleTextarea,
}) => {
  return (
    <>
      <h2 className="order__container__filter-container__box__category-wrapper__question">
        {categoryToFilter.subCategory[0].category}
      </h2>
      <textarea
        name="textarea"
        id={categoryToFilter.subCategory[0].slug.replace("/", "")}
        value={actualFilterValue}
        onChange={handleTextarea}
        autoComplete="off"
        autoCorrect="off"
        placeholder="Digite aqui"
        className="order__container__filter-container__box__category-wrapper__textarea"
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

export default TextareaTypeFilter;
