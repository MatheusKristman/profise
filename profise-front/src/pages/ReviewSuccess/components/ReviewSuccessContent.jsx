import React from "react";
import { Link } from "react-router-dom";

function ReviewSuccessContent() {
  return (
    <section className="review-success-container">
      <div className="review-success-box">
        <div className="review-success-icon-box">
          <i className="fa-solid fa-check" />
        </div>

        <h2 className="review-success-title">Avaliação enviada com sucesso!</h2>

        <p className="review-success-desc">
          Sua avaliação foi registrada com sucesso. Estamos comprometidos em
          usar seu feedback para melhorar continuamente a experiência de nossos
          usuários.
        </p>

        <Link to="/" className="review-success-home-btn">
          Voltar para início
        </Link>
      </div>
    </section>
  );
}

export default ReviewSuccessContent;
