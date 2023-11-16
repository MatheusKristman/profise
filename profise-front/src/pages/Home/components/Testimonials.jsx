import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import images from "../../../assets";

const isMobile = window.innerWidth < 1024;

function Testimonials() {
  return (
    <section className="testimonial">
      <div className="testimonial__container">
        <div className="testimonial__container__image-left-box">
          <img
            src={images.testimonialLeft}
            alt="Declarações"
            className="testimonial__container__image-left-box__image-left"
          />
        </div>

        <div className="testimonial__container__image-right-box">
          <img
            src={images.testimonialRight}
            alt="Declarações"
            className="testimonial__container__image-right-box__image-right"
          />
        </div>

        <h2 className="testimonial__container__title wrapper">
          Experiências dos Nossos Clientes
        </h2>

        <p className="testimonial__container__desc wrapper">
          Descubra como nossos clientes encontraram sucesso ao usar nossa
          plataforma para encontrar profissionais talentosos. Leia os
          testemunhos inspiradores sobre projetos bem-sucedidos e colaborações
          incríveis.
        </p>

        <div className="testimonial__container__carousel">
          <OwlCarousel
            loop
            items={1}
            autoplay={isMobile}
            autoplayTimeout={10000}
            smartSpeed={500}
            dots
            dotsEach={1}
            className="owl-theme"
          >
            <div className="item">
              <div className="testimonial-box wrapper">
                <div className="testimonial-box__image-box">
                  <img
                    src={images.testimonial1}
                    alt="Profissional"
                    className="testimonial-box__image-box__image"
                  />
                </div>

                <h4 className="testimonial-box__opinion-title">
                  Qualidade Impecável!
                </h4>
                <p className="testimonial-box__opinion-desc">
                  Encontrei um eletricista experiente em minutos. O trabalho foi
                  feito de maneira exemplar, mostrando comprometimento com a
                  segurança e eficiência.
                </p>

                <span className="testimonial-box__name">Marcelo Santos</span>
              </div>
            </div>

            <div className="item">
              <div className="testimonial-box wrapper">
                <div className="testimonial-box__image-box">
                  <img
                    src={images.testimonial2}
                    alt="Profissional"
                    className="testimonial-box__image-box__image"
                  />
                </div>

                <h4 className="testimonial-box__opinion-title">
                  Solução Rápida
                </h4>
                <p className="testimonial-box__opinion-desc">
                  Encontrar um encanador nunca foi tão fácil. Recebi várias
                  propostas rapidamente e resolvi um problema antigo de
                  vazamento em questão de dias.
                </p>

                <span className="testimonial-box__name">Carolina Lima</span>
              </div>
            </div>

            <div className="item">
              <div className="testimonial-box wrapper">
                <div className="testimonial-box__image-box">
                  <img
                    src={images.testimonial3}
                    alt="Profissional"
                    className="testimonial-box__image-box__image"
                  />
                </div>

                <h4 className="testimonial-box__opinion-title">
                  Decoração que Encanta!
                </h4>
                <p className="testimonial-box__opinion-desc">
                  Minha loja ganhou um novo visual graças ao decorador que
                  encontrei. Ele capturou a essência da marca e criou um espaço
                  acolhedor e único.
                </p>

                <span className="testimonial-box__name">Lucas Martins</span>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
