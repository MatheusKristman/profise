/* eslint-disable react/prop-types */
import React from "react";

import Buttons from "../Buttons";

const SelectTypeFilter = ({
  categoryToFilter,
  errorExists,
  errorMessage,
  handleSelect,
}) => {
  return (
    <>
      <h2 className="order__container__filter-container__box__category-wrapper__question">
        {categoryToFilter.subCategory[0].category}
      </h2>

      <select
        onClick={handleSelect}
        className="order__container__filter-container__box__category-wrapper__select"
      >
        {categoryToFilter.subCategory[0].options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {errorExists && (
        <span className="order__container__filter-container__box__category-wrapper__error-message">
          {errorMessage}
        </span>
      )}

      {/* <Buttons indexPage={indexPage} handleBackBtn={handleBackBtn} handleNextBtn={handleNextBtn} disabled={disabled} /> */}
    </>
  );
};

export default SelectTypeFilter;
