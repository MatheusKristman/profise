import React from "react";
import { useNavigate } from "react-router-dom";

import images from "../../../assets";
import useOrderStore from "../../../stores/useOrderStore";

function Categories() {
  const { idCategorySelected, setIdCategorySelected } = useOrderStore();

  const navigate = useNavigate();

  function handleCategoryNavigation(id, slug) {
    setIdCategorySelected(id);

    navigate(`/pedido/${slug}`, {
      state: "categoryPage",
    });
  }

  return (
    <section className="categories wrapper">
      <div className="categories__container">
        <h2 className="categories__container__title">Categorias Populares</h2>
        <p className="categories__container__desc">
          2020 pedidos - 293 adicionados hoje.
        </p>

        <div className="categories__container__wrapper">
          <div
            onClick={() =>
              handleCategoryNavigation("64f8b849090465a64ca26706", "diarista")
            }
            className="category-box"
          >
            <div className="category-image-box">
              <img
                src={images.vacuum}
                alt="Aspirador"
                className="category-image"
              />
            </div>

            <span className="category-name">Diarista</span>
          </div>
          <div
            onClick={() =>
              handleCategoryNavigation(
                "6511cee0c42dcc3bf618ad66",
                "reformas-e-reparos"
              )
            }
            className="category-box"
          >
            <div className="category-image-box">
              <img
                src={images.repair}
                alt="Reparos"
                className="category-image"
              />
            </div>

            <span className="category-name">Reformas e Reparos</span>
          </div>
          <div className="category-box">
            <div className="category-image-box">
              <img
                src={images.pen}
                alt="Serviços Domésticos"
                className="category-image"
              />
            </div>

            <span className="category-name">Serviços Domésticos</span>
          </div>
          <div className="category-box">
            <div className="category-image-box">
              <img
                src={images.headset}
                alt="Headset"
                className="category-image"
              />
            </div>

            <span className="category-name">Assistência técnica</span>
          </div>
          <div className="category-box">
            <div className="category-image-box">
              <img src={images.pencil} alt="Lapis" className="category-image" />
            </div>

            <span className="category-name">Aulas</span>
          </div>
          <div className="category-box">
            <div className="category-image-box">
              <img
                src={images.makeUp}
                alt="Maquiagem"
                className="category-image"
              />
            </div>

            <span className="category-name">Moda e Beleza</span>
          </div>
          <div className="category-box">
            <div className="category-image-box">
              <img src={images.health} alt="Saúde" className="category-image" />
            </div>

            <span className="category-name">Saúde</span>
          </div>
          <div className="category-box">
            <div className="category-image-box">
              <img
                src={images.event}
                alt="Eventos"
                className="category-image"
              />
            </div>

            <span className="category-name">Eventos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
