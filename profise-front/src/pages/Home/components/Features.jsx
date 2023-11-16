import React from "react";

import images from "../../../assets";

function Features() {
  function handleBtn() {
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <section id="beneficios" className="features wrapper">
      <div className="features__container">
        <div className="features__container__images">
          <div className="features-image-box">
            <img
              src={images.featureImage}
              alt="Benefícios"
              className="features-image"
            />
          </div>
        </div>

        <div className="features__container__infos">
          <h2 className="features-title">
            Você irá encontrar os melhores profissionais
          </h2>
          <p className="features-desc">
            Pesquise todos profissionais disponíveis na sua região. Obtenha sua
            própria estimativa de valor personalizado. Leia comentários e
            avaliações, faça a melhor escolha.
          </p>

          <ul className="features-list">
            <li className="features-item">
              Recebera várias ofertas para o serviço.
            </li>
            <li className="features-item">
              Negocie diretamente com o profissional.
            </li>
            <li className="features-item">Avalie o serviço.</li>
          </ul>

          <button onClick={handleBtn} type="button" className="features-btn">
            Publique sua demanda
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;
