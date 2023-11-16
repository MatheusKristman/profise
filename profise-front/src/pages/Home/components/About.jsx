import React, { useContext } from "react";
import Context from "../../../Context";

import images from "../../../assets";

function About() {
  const { howItWorksRef } = useContext(Context);

  return (
    <section id="sobre" ref={howItWorksRef} className="about wrapper">
      <div className="about__container">
        <h2 className="about__container__title">
          Simplificando Suas Buscas por Serviços
        </h2>
        <p className="about__container__desc">
          Descubra como nossa plataforma simplifica o processo de encontrar
          profissionais qualificados para realizar os serviços que você precisa.
          De envio de solicitações a colaborações bem-sucedidas, cada etapa é
          projetada para oferecer facilidade, escolha e qualidade.
        </p>

        <div className="about__container__wrapper">
          <div className="about__container__wrapper__box">
            <div className="about-image-box">
              <img src={images.about1} alt="Sobre" className="about-image" />
            </div>

            <h3 className="about-box-title">
              Encontre os Profissionais Certos
            </h3>
            <p className="about-box-text">
              Navegue por uma variedade de categorias e encontre os
              profissionais perfeitos para realizar o serviço que você precisa.
            </p>
          </div>

          <div className="about__container__wrapper__box">
            <div className="about-image-box">
              <img src={images.about2} alt="Sobre" className="about-image" />
            </div>

            <h3 className="about-box-title">
              Crie uma Solicitação Personalizada
            </h3>
            <p className="about-box-text">
              Preencha um questionário feito sob medida para que os
              profissionais entendam claramente o que você deseja alcançar.
            </p>
          </div>

          <div className="about__container__wrapper__box">
            <div className="about-image-box">
              <img src={images.about3} alt="Sobre" className="about-image" />
            </div>

            <h3 className="about-box-title">Transformando Ideias em Ação</h3>
            <p className="about-box-text">
              Receba mensagens de profissionais empolgados para transformar suas
              ideias em ações concretas, discutindo detalhes e possibilidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
