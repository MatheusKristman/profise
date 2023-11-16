/* eslint-disable react/prop-types */
import React from "react";
import RegisterForm from "./RegisterForm";

import images from "../../../assets";

function RegisterContent() {
  return (
    <section className="register">
      <div className="register__image-outer-box">
        <img
          src={images.registerImage}
          alt="Cadastro"
          className="register__image-outer-box__image"
        />
      </div>
      <div className="register__container wrapper">
        <h2 className="register__container__title">Seja um profissional</h2>

        <p className="register__container__desc">
          Faça parte da nossa comunidade de profissionais talentosos e tenha a
          oportunidade de oferecer suas habilidades a uma ampla variedade de
          clientes em busca de expertise especializada.
        </p>

        <RegisterForm />
      </div>
    </section>
  );
}

export default RegisterContent;
