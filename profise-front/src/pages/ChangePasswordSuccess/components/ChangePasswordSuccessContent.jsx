import React from "react";
import { Link } from "react-router-dom";

const ChangePasswordSuccessContent = () => {
  return (
    <div className="change-password-success-container">
      <div className="change-password-success-wrapper">
        <div className="change-password-success-icon-box">
          <i className="fa-solid fa-check" />
        </div>

        <h2 className="change-password-success-title">
          E-mail de Recuperação Enviado
        </h2>

        <p className="change-password-success-desc">
          Um e-mail com instruções para a recuperação de senha foi enviado para
          o seu endereço de e-mail. Por favor, verifique sua caixa de entrada e
          siga as orientações para restaurar o acesso à sua conta.
        </p>

        <Link to="/" className="change-password-success-link">
          Voltar para início
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordSuccessContent;
