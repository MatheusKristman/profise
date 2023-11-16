/* eslint-disable consistent-return */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

import images from "../../../assets";
import useHeroStore from "../../../stores/useHeroStore";
import useOrderStore from "../../../stores/useOrderStore";

function Hero() {
  const { setIdCategorySelected } = useOrderStore();

  const [categories, setCategories] = useState({});
  const [resultSearch, setResultSearch] = useState([]);
  const [categoryResult, setCategoryResult] = useState([]);
  const [slugSelected, setSlugSelected] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [categoryExists, setCategoryExists] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mousePos, setMousePos] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageContents = useRef(null);
  const photos = useRef(null);
  const input = useRef(null);
  const suggestionsRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleFocus = () => {
      suggestionsRef.current.style.display = "flex";
    };

    const handleBlur = () => {
      setTimeout(() => {
        suggestionsRef.current.style.display = "none";
      }, 100);
    };

    input.current.addEventListener("focus", handleFocus);
    input.current.addEventListener("blur", handleBlur);

    return () => {
      if (input.current) {
        input.current.removeEventListener("focus", handleFocus);
        input.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  useEffect(() => {
    api
      .get("category/all-categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error(error));
  }, [setCategories]);

  useEffect(() => {
    if (inputValue && inputValue.length > 3) {
      api
        .get(`/category/search-categories?search=${inputValue}`)
        .then((res) => {
          const result = res.data;

          if (categories.length > 0) {
            const categoriesResult = categories.filter((category) => {
              for (const res of result) {
                if (res.idSelected === category._id) {
                  return category;
                }
              }
            });

            setCategoryResult(categoriesResult);
            setResultSearch(res.data);
            setCategoryExists(true);
          } else {
            resetInput();
            setErrorSearch("Não possui categorias disponíveis no momento");
            setCategoryExists(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setCategoryExists(false);
        });
    } else {
      setCategoryResult([]);
      setCategoryExists(false);
    }
  }, [
    inputValue,
    setResultSearch,
    setErrorSearch,
    setCategoryResult,
    setCategoryExists,
  ]);

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      function handleMouseMove(e) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [setMousePos]);

  useEffect(() => {
    function handleContentMove() {
      const positionY = (window.innerHeight + mousePos.y * 2) / 90;
      const positionXContent = (window.innerWidth + mousePos.x) / 90;
      const positionX = (window.innerWidth + mousePos.x * 2) / 90;

      imageContents.current.style.transform = `translateY(${positionY}px) translateX(${
        positionXContent - 120
      }px)`;
      photos.current.style.transform = `translateX(${positionX}px)`;
    }

    handleContentMove();
  }, [mousePos]);

  function inputChange(event) {
    setInputValue(event.target.value);
  }

  function moveResultToInput(id, category) {
    setInputValue(category);
    const resultSelected = { id, slug: null };

    for (const res of resultSearch) {
      if (res.idSelected === id) {
        resultSelected.slug = res.slugSelected;
      }
    }

    setSlugSelected(resultSelected.slug);
    setIdCategorySelected(resultSelected.id);
  }

  function navigateToOrder() {
    setIsSubmitting(true);

    if (categoryExists && slugSelected) {
      setIsSubmitting(false);

      navigate(`/pedido${slugSelected}`, {
        state: "categoryPage",
      });

      return;
    }

    setInputValue("");
    setErrorSearch("Selecione uma sugestão ao pesquisar");
    setIsSubmitting(false);
    return;
  }

  return (
    <main className="hero">
      <div className="hero__container wrapper">
        <div className="hero__container__infos">
          <h1 className="hero__container__infos__title">
            Ajudamos você a encontrar o melhor profissional!
          </h1>
          <p className="hero__container__infos__desc">
            Nos conte qual trabalho você precisa para encontrarmos o melhor
            profissional para você.
          </p>
          <div className="hero__container__infos__input-wrapper">
            <div className="input-box">
              <input
                ref={input}
                type="text"
                placeholder={errorSearch || "O que você precisa?"}
                className={errorSearch ? "input error" : "input"}
                value={inputValue}
                onChange={inputChange}
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="word"
              />
              <i className="fa-solid fa-magnifying-glass input-icon" />
            </div>

            <ul ref={suggestionsRef} className="search-suggestion">
              {inputValue.length >= 3 && categoryResult.length === 0 ? (
                <li className="search-suggestion__item">Pesquisando...</li>
              ) : categoryResult.length > 0 ? (
                categoryResult.map((category) => (
                  <li
                    key={`prof-${category.slug}`}
                    tabIndex="0"
                    className="search-suggestion__item"
                    onClick={() => {
                      moveResultToInput(category._id, category.category);
                    }}
                    onKeyDown={() => {
                      if (window.event.keyCode === 13) {
                        moveResultToInput(category._id, category.category);
                      }
                    }}
                  >
                    {category.category}
                  </li>
                ))
              ) : (
                <li className="search-suggestion__item">
                  Faça sua pesquisa...
                </li>
              )}
            </ul>

            <button
              type="submit"
              onClick={navigateToOrder}
              disabled={isSubmitting}
              className="input-btn"
            >
              Pesquisar
            </button>
          </div>

          <p className="hero__container__infos__related-search">
            <strong>Pesquisas Populares :</strong> Pintor, Pedreiro, Diarista,
            Eletricista, Marceneiro, Carreto, Arquiteto
          </p>
        </div>

        <div className="hero__container__images">
          <div ref={imageContents} className="hero__container__images__content">
            <div className="budget-box">
              <div className="budget-image">
                <img src={images.email} alt="email" className="email-icon" />
              </div>
              <div className="budget-info">
                <p className="budget-text">
                  Pedido de orçamento enviado pelo cliente
                </p>
              </div>
            </div>

            <div className="prof-box">
              <div className="prof-info">
                <p className="prof-text">Milhares de Profissionais</p>
              </div>
              <ul className="prof-images">
                <li className="prof-item">
                  <img
                    src={images.pro1}
                    alt="profissional"
                    className="prof-image"
                  />
                </li>
                <li className="prof-item">
                  <img
                    src={images.pro2}
                    alt="profissional"
                    className="prof-image"
                  />
                </li>
                <li className="prof-item">
                  <img
                    src={images.pro3}
                    alt="profissional"
                    className="prof-image"
                  />
                </li>
                <li className="prof-item">
                  <img
                    src={images.pro4}
                    alt="profissional"
                    className="prof-image"
                  />
                </li>
                <li className="prof-item">
                  <i className="fa-solid fa-plus prof-plus" />
                </li>
              </ul>
            </div>
          </div>

          <div ref={photos} className="hero__container__images__photos">
            <div className="photo-1" />
            <div className="photo-2" />
            <div className="photo-3" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
