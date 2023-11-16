/* eslint-disable react/prop-types */
import React from "react";

const ButtonTypeFilter = ({ categoryToFilter, disabled, handleButton }) => {
  return (
    <>
      <h2 className="order__container__filter-container__box__category-wrapper__question">
        {categoryToFilter.category}
      </h2>

      {categoryToFilter.subCategory.map((category) => (
        <button
          key={category.category}
          onClick={() => handleButton(category)}
          disabled={disabled}
          className="order__container__filter-container__box__category-wrapper__btn"
        >
          {category.category}
        </button>
      ))}
    </>
  );
};

export default ButtonTypeFilter;
