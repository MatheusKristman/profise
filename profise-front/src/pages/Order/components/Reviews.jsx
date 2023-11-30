import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import useOrderStore from "../../../stores/useOrderStore";
import api from "../../../services/api";

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
  const [reviews, setReviews] = useState([]);

  const { rating, idCategorySelected, setToLoad, setToNotLoad } = useOrderStore();

  useEffect(() => {
    setToLoad();

    api
      .get(`/professional/get-reviews-from-category?categoryId=${idCategorySelected}`)
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      })
      .finally(() => {
        setToNotLoad();
      });
  }, []);

  return (
    <section className="review wrapper">
      <div className="review__container">
        <h3 className="review__container__title">Experiências de Sucesso</h3>

        <p className="review__container__desc">
          Nossos clientes compartilharam suas experiências com os profissionais nesta categoria.
          Suas avaliações podem lhe dar uma visão realista sobre o que esperar e auxiliá-lo na sua
          escolha.
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
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.details} className="item">
                <div className="review-box">
                  <div className="review-box__container">
                    <div className="review-box__container__wrapper">
                      <span className="review-box__container__wrapper__title">
                        <strong>{review.reviewerName}</strong> avaliou:
                      </span>

                      <p className="review-box__container__wrapper__desc">{review.details}</p>
                    </div>

                    <div className="review-box__container__wrapper">
                      <div className="review-box__container__wrapper__rating">
                        <i
                          className={review.rate > 0 ? "fa-solid fa-star" : "fa-regular fa-star"}
                        />
                        <i
                          className={review.rate > 1 ? "fa-solid fa-star" : "fa-regular fa-star"}
                        />
                        <i
                          className={review.rate > 2 ? "fa-solid fa-star" : "fa-regular fa-star"}
                        />
                        <i
                          className={review.rate > 3 ? "fa-solid fa-star" : "fa-regular fa-star"}
                        />
                        <i
                          className={review.rate > 4 ? "fa-solid fa-star" : "fa-regular fa-star"}
                        />
                      </div>

                      <p className="review-box__container__wrapper__pro">
                        Para {review.professionalName} / {review.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="item">
                <div className="review-box">
                  <div className="review-box__container">
                    <div className="review-box__container__wrapper">
                      <span className="review-box__container__wrapper__title">
                        <strong>Mariana Saraiva</strong> avaliou:
                      </span>

                      <p className="review-box__container__wrapper__desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, illo?
                      </p>
                    </div>

                    <div className="review-box__container__wrapper">
                      <div className="review-box__container__wrapper__rating">
                        <i className={rating > 0 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 1 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 2 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 3 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 4 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                      </div>

                      <p className="review-box__container__wrapper__pro">
                        Para Paula Souza / Serviços Domésticos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="review-box">
                  <div className="review-box__container">
                    <div className="review-box__container__wrapper">
                      <span className="review-box__container__title">
                        <strong>José Carlos</strong> avaliou:
                      </span>

                      <p className="review-box__container__desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, illo?
                      </p>
                    </div>

                    <div className="review-box__container__wrapper">
                      <div className="review-box__container__wrapper__rating">
                        <i className={rating > 0 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 1 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 2 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 3 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                        <i className={rating > 4 ? "fa-solid fa-star" : "fa-regular fa-star"} />
                      </div>

                      <p className="review-box__container__wrapper__pro">
                        Para Lucas Alberto / Serviços Domésticos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </OwlCarousel>
      </div>
    </section>
  );
}

export default Reviews;
