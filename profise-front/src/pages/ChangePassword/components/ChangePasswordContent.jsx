import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import requestPasswordChangeSchema from "../../../schemas/requestPasswordChangeSchema";
import api from "../../../services/api";

const ChangePasswordContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(requestPasswordChangeSchema),
  });

  const email = watch("email");

  function onSubmit(data) {
    setIsSubmitting(true);

    api
      .post("/professional/request-password-change", { email })
      .then((res) => {
        if (res.data.sended) {
          Navigate("/esqueci-a-senha/email-enviado");
        } else {
          toast.error(
            "Ocorreu um erro durante a solicitação, tente novamente",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="change-password-container">
      <div className="change-password-wrapper">
        <h2 className="change-password-title">Esqueceu Sua Senha?</h2>
        <p className="change-password-desc">
          Recuperar sua senha é simples. Forneça seu endereço de e-mail e siga
          as instruções para redefinir sua senha e voltar a usar sua conta.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="change-password-form"
        >
          <input
            {...register("email")}
            className="change-password-input"
            placeholder="Insira seu email"
            autoComplete="off"
            autoCorrect="off"
            style={errors.email ? { border: "1px solid rgb(243, 50, 50)" } : {}}
          />
          {errors.email && (
            <span className="email-error">{errors.email?.message}</span>
          )}
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Enviando" : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordContent;
