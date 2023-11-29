/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SimpleBar from "simplebar-react";

import "react-toastify/dist/ReactToastify.css";
import "../../../css/Order/order.css";
import "simplebar-react/dist/simplebar.min.css";

import useOrderStore from "../../../stores/useOrderStore";
import api from "../../../services/api";
import ButtonTypeFilter from "./filters/ButtonTypeFilter";
import RadioTypeFilter from "./filters/RadioTypeFilter";
import SelectTypeFilter from "./filters/SelectTypeFilter";
import CheckboxTypeFilter from "./filters/CheckboxTypeFilter";
import TextTypeFilter from "./filters/TextTypeFilter";
import TextareaTypeFilter from "./filters/TextareaTypeFilter";
import FinalSteps from "./filters/FinalSteps";
import NotFoundBox from "./NotFoundBox";
import CategoryNotFound from "./CategoryNotFound";
import Buttons from "./Buttons";

function OrderContent({ setIsLoadingAnimationActive }) {
  const { slug } = useParams();

  const {
    idCategorySelected,
    isLoading,
    setToLoad,
    setToNotLoad,
    resetOrderStore,
  } = useOrderStore();

  const [categoryToFilter, setCategoryToFilter] = useState({});
  const [completeCategory, setCompleteCategory] = useState({});
  const [filterData, setFilterData] = useState({
    category: "",
    categoryId: "",
    requestAnswers: [],
    requesterLocation: "",
    requesterName: "",
    requesterEmail: "",
    requesterContact: "",
  });
  const [indexPage, setIndexPage] = useState(0);
  const [actualFilterValue, setActualFilterValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorExists, setErrorExists] = useState(false);

  // reset
  useEffect(() => {
    resetOrderStore();
  }, [resetOrderStore]);

  useEffect(() => {
    function fetchCategory() {
      setToLoad();
      setIsLoadingAnimationActive(true);

      api
        .post(`/category/find-category`, { id: idCategorySelected })
        .then((res) => {
          const category = verifyCategorySlug(res.data, slug);

          const filter = filterData;

          filter.category = res.data.category;
          filter.categoryId = idCategorySelected;

          setCompleteCategory(res.data);
          setFilterData(filter);
          setCategoryToFilter(category);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoadingAnimationActive(false);

          setTimeout(() => {
            setToNotLoad();
          }, 1000);
        });
    }

    fetchCategory();
  }, [slug, setCategoryToFilter, setToLoad, setToNotLoad]);

  function verifyPreviousCategory(category, slug) {
    for (const sub of category.subCategory) {
      if (sub.slug.includes(slug)) {
        return category;
      }

      if (sub.subCategory && sub.subCategory.length > 0) {
        const subCategory = verifyPreviousCategory(sub, slug);

        if (subCategory) {
          return subCategory;
        }
      }
    }
  }

  function verifyNextCategory(category, value) {
    if (category.subCategory && category.subCategory.length > 0) {
      if (category.subCategory[0].input === "button") {
        return category.subCategory.filter((sub) => sub.category === value)[0];
      }

      return category.subCategory[0];
    }
    return [];
  }

  function verifyCategorySlug(category, slug) {
    if (category.slug.includes(slug)) {
      return category;
    }

    if (category.subCategory && category.subCategory.length > 0) {
      for (const sub of category.subCategory) {
        const subCategory = verifyCategorySlug(sub, slug);

        if (subCategory) {
          return subCategory;
        }
      }
    }
  }

  function handleNextBtn(data, question, category) {
    setToLoad();
    setIsLoadingAnimationActive(true);

    if (data) {
      const filter = filterData;

      filter.requestAnswers.push({ question, answer: data });

      const nextCategory = verifyNextCategory(category, data);

      setCategoryToFilter(nextCategory);
      setFilterData(filter);
      setIndexPage((prev) => prev + 1);
      setErrorExists(false);
      setErrorMessage("");
      setActualFilterValue("");
    } else {
      setErrorExists(true);
      setErrorMessage("Campo é obrigatório");
    }

    setIsLoadingAnimationActive(false);

    setTimeout(() => {
      setToNotLoad();
    }, 1000);
  }

  function handleBackBtn(slug) {
    setToLoad();
    setIsLoadingAnimationActive(true);

    const filter = filterData;
    filter.requestAnswers.splice(-1, 1);
    const previousCategory = verifyPreviousCategory(completeCategory, slug);

    setCategoryToFilter(previousCategory);
    setFilterData(filter);
    setIndexPage((prev) => prev - 1);
    setActualFilterValue("");

    setIsLoadingAnimationActive(false);

    setTimeout(() => {
      setToNotLoad();
    }, 1000);
  }

  function handleFinalFilterBackBtn(slug) {
    setToLoad();
    setIsLoadingAnimationActive(true);

    const filter = filterData;

    const previousCategory = verifyPreviousCategory(completeCategory, slug);

    setCategoryToFilter(previousCategory);
    setFilterData(filter);
    setIndexPage((prev) => prev - 1);
    setActualFilterValue("");

    setIsLoadingAnimationActive(false);

    setTimeout(() => {
      setToNotLoad();
    }, 1000);
  }

  function handleButton(category) {
    setActualFilterValue(category.category);
    handleNextBtn(category.category, category.category, categoryToFilter);
  }

  function handleCheckbox(event) {
    setActualFilterValue((prev) => {
      if (!prev) {
        return [event.target.value];
      }

      if (prev.includes(event.target.value)) {
        return prev.filter((arr) => arr !== event.target.value);
      }

      return [...prev, event.target.value];
    });
  }

  function handleRadio(event) {
    setActualFilterValue(event.target.value);
  }

  function handleSelect(event) {
    setActualFilterValue(event.target.value);
  }

  function handleTextarea(event) {
    setActualFilterValue(event.target.value);
  }

  function handleText(event) {
    setActualFilterValue(event.target.value);
  }

  return (
    <section className="order">
      <ToastContainer />
      <div className="order__container wrapper">
        <h3 className="order__container__title">Publique sua demanda</h3>

        <div className="order__container__filter-container">
          <div className="order__container__filter-container__box">
            {Object.keys(categoryToFilter).length > 0 ? (
              categoryToFilter.subCategory.length > 0 ? (
                <>
                  <SimpleBar
                    style={{
                      maxHeight: 600,
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                    className="order__container__filter-container__box__category-wrapper"
                  >
                    {categoryToFilter.subCategory[0].input === "button" ? (
                      <ButtonTypeFilter
                        categoryToFilter={categoryToFilter}
                        disabled={isLoading}
                        handleButton={handleButton}
                      />
                    ) : categoryToFilter.subCategory[0].input === "radio" ? (
                      <RadioTypeFilter
                        categoryToFilter={categoryToFilter}
                        errorExists={errorExists}
                        errorMessage={errorMessage}
                        handleRadio={handleRadio}
                      />
                    ) : categoryToFilter.subCategory[0].input === "select" ? (
                      <SelectTypeFilter
                        categoryToFilter={categoryToFilter}
                        errorExists={errorExists}
                        errorMessage={errorMessage}
                        handleSelect={handleSelect}
                      />
                    ) : categoryToFilter.subCategory[0].input === "checkbox" ? (
                      <CheckboxTypeFilter
                        categoryToFilter={categoryToFilter}
                        errorExists={errorExists}
                        errorMessage={errorMessage}
                        handleCheckbox={handleCheckbox}
                      />
                    ) : categoryToFilter.subCategory[0].input === "text" ? (
                      <TextTypeFilter
                        categoryToFilter={categoryToFilter}
                        errorExists={errorExists}
                        errorMessage={errorMessage}
                        actualFilterValue={actualFilterValue}
                        handleText={handleText}
                      />
                    ) : categoryToFilter.subCategory[0].input === "textarea" ? (
                      <TextareaTypeFilter
                        categoryToFilter={categoryToFilter}
                        errorExists={errorExists}
                        errorMessage={errorMessage}
                        actualFilterValue={actualFilterValue}
                        handleTextarea={handleTextarea}
                      />
                    ) : (
                      <NotFoundBox />
                    )}
                  </SimpleBar>

                  {categoryToFilter.subCategory[0].input !== "button" && (
                    <Buttons
                      indexPage={indexPage}
                      handleBackBtn={() => handleBackBtn(categoryToFilter.slug)}
                      handleNextBtn={() =>
                        handleNextBtn(
                          actualFilterValue,
                          categoryToFilter.subCategory[0].category,
                          categoryToFilter
                        )
                      }
                      disabled={isLoading}
                    />
                  )}
                </>
              ) : (
                <FinalSteps
                  indexPage={indexPage}
                  handleBackBtn={() =>
                    handleFinalFilterBackBtn(categoryToFilter.slug)
                  }
                  filterData={filterData}
                  setFilterData={setFilterData}
                  errorExists={errorExists}
                  errorMessage={errorMessage}
                  setErrorExists={setErrorExists}
                  setErrorMessage={setErrorMessage}
                  setIsLoadingAnimationActive={setIsLoadingAnimationActive}
                />
              )
            ) : (
              <CategoryNotFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderContent;
