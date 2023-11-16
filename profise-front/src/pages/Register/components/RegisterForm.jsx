/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useRegisterStore from "../../../stores/useRegisterStore";
import professionalRegisterSchema from "../../../schemas/professionalRegisterSchema";
import api from "../../../services/api";

function RegisterForm() {
  const { setNameValue, setCelValue, setEmailValue, SMSTokenOpened, isSMSTokenOpen } =
    useRegisterStore();

  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(professionalRegisterSchema),
    defaultValues: {
      name: "",
      cel: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    api
      .post("/professional/register-verification", { email: data.email })
      .then((res) => {
        if (res.data.registered) {
          Navigate(`/completar-cadastro-profissional?id=${res.data.id}`);
        } else {
          setNameValue(data.name);
          setCelValue(data.cel);
          setEmailValue(data.email);

          SMSTokenOpened();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleInput(event) {
    let cel = event.target.value.replace(/\D/g, "");

    if (cel.length < 10) {
      cel = cel.replace(/(\d{2})(\d)/, "($1) $2");
    } else if (cel.length === 11) {
      cel = cel.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    } else {
      return;
    }

    setValue("cel", cel);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <label htmlFor="name" className="register-form__name-label">
        Seu Nome
        <input
          {...register("name")}
          type="text"
          name="name"
          id="name"
          className="register-form__name-label__input"
          style={errors.name ? { borderColor: "rgb(243, 50, 50)" } : {}}
          disabled={isSMSTokenOpen}
          placeholder="John Doe.."
        />
        {errors.name && <small className="error-message">{errors.name?.message}</small>}
      </label>

      <label htmlFor="cel" className="register-form__cel-label">
        Celular
        <input
          {...register("cel")}
          type="text"
          name="cel"
          id="cel"
          onChange={handleInput}
          maxLength={15}
          className="register-form__cel-label__input"
          style={errors.cel ? { borderColor: "rgb(243, 50, 50)" } : {}}
          disabled={isSMSTokenOpen}
          placeholder="(00) 00000-0000"
        />
        {errors.cel && <small className="error-message">{errors.cel?.message}</small>}
      </label>

      <label htmlFor="email" className="register-form__email-label">
        E-mail
        <input
          {...register("email")}
          type="text"
          name="email"
          id="email"
          className="register-form__email-label__input"
          style={errors.email ? { borderColor: "rgb(243, 50, 50)" } : {}}
          disabled={isSMSTokenOpen}
          placeholder="Ex: nome@email.com"
        />
        {errors.email && <small className="error-message">{errors.email?.message}</small>}
      </label>

      <button type="submit" disabled={isSMSTokenOpen} className="register-form__submit-btn">
        {isSMSTokenOpen ? "Enviando" : "Prosseguir"}
      </button>
    </form>
  );
}

export default RegisterForm;
