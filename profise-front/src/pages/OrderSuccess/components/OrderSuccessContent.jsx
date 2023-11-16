import React from "react";
import { Link } from "react-router-dom";

function OrderSuccessContent() {
  return (
    <div className="order-success-container wrapper">
      <div className="order-success-check-box">
        <i className="fa-solid fa-check order-success-check" />
      </div>

      <h1 className="order-success-title">
        Sua solicitação foi criada com sucesso!
      </h1>
      <span className="order-success-desc">
        Agora é só aguardar o contato do profissional
      </span>

      <Link to="/" className="order-success-back-button">
        Voltar Para Início
      </Link>
    </div>
  );
}

export default OrderSuccessContent;
