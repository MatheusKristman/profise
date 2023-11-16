import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import useOrderStore from "../../../stores/useOrderStore";

const stateRes = {
  responsive: {
    0: {
      dotsEach: 1,
      items: 1,
    },
    600: {
      dotsEach: 2,
      items: 2,
    },
    768: {
      dotsEach: 3,
      items: 3,
    },
    1024: {
      dotsEach: 4,
      items: 4,
    },
  },
};

const isMobile = window.innerWidth < 1024;

function Reviews() {
  const { rating } = useOrderStore((state) => ({ rating: state.rating }));

  return (
    <section className="review wrapper">
      <div className="review__container">
        <h3 className="review__container__title">Experiências de Sucesso</h3>

        <p className="review__container__desc">
          Nossos clientes compartilharam suas experiências com os profissionais
          nesta categoria. Suas avaliações podem lhe dar uma visão realista
          sobre o que esperar e auxiliá-lo na sua escolha.
        </p>

        <OwlCarousel
          loop
          responsive={stateRes.responsive}
          autoplay={isMobile}
          autoplayTimeout={10000}
          smartSpeed={500}
          dots
          className="owl-theme"
          margin={25}
        >
          <div className="item">
            <div className="review-box">
              <div className="review-box__container">
                <span className="review-box__container__title">
                  <strong>Mariana Saraiva</strong> avaliou:
                </span>

                <p className="review-box__container__desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Illum, illo?
                </p>

                <div className="review-box__container__rating">
                  <i
                    className={
                      rating > 0 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 1 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 2 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 3 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 4 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                </div>

                <p className="review-box__container__pro">
                  Para Paula Souza / Serviços Domésticos
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="review-box">
              <div className="review-box__container">
                <span className="review-box__container__title">
                  <strong>José Carlos</strong> avaliou:
                </span>

                <p className="review-box__container__desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Illum, illo?
                </p>

                <div className="review-box__container__rating">
                  <i
                    className={
                      rating > 0 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 1 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 2 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 3 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                  <i
                    className={
                      rating > 4 ? "fa-solid fa-star" : "fa-regular fa-star"
                    }
                  />
                </div>

                <p className="review-box__container__pro">
                  Para Lucas Alberto / Serviços Domésticos
                </p>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </section>
  );
}

export default Reviews;
