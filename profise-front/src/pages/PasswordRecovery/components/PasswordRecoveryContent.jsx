import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import passwordRecoverySchema from "../../../schemas/passwordRecoverSchema";
import useQuery from "../../../hooks/useQuery";
import api from "../../../services/api";

const PasswordRecoveryContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(passwordRecoverySchema),
  });

  const query = useQuery();

  function onSubmit(data) {
    setIsSubmitting(true);

    api
      .post("/professional/password-recovery", {
        id: query.get("id"),
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        Navigate("/");
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
    <div className="password-recovery-container">
      <div className="password-recovery-wrapper">
        <h2 className="password-recovery-title">Recuperação de senha</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="password-recovery-form"
        >
          <label htmlFor="password" className="password-recovery-label">
            Nova senha
            <input
              {...register("password")}
              type="text"
              className="password-recovery-input"
              placeholder="Insira sua nova senha"
              id="password"
              name="password"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              style={
                errors.password ? { border: "1px solid rgb(243, 50, 50)" } : {}
              }
            />
            {errors.password && (
              <span className="error-message">{errors.password?.message}</span>
            )}
          </label>
          <label htmlFor="passwordConfirm" className="password-recovery-label">
            Confirma sua nova senha
            <input
              {...register("passwordConfirm")}
              type="text"
              className="password-recovery-input"
              placeholder="Insira sua nova senha novamente"
              id="passwordConfirm"
              name="passwordConfirm"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              style={
                errors.passwordConfirm
                  ? { border: "1px solid rgb(243, 50, 50)" }
                  : {}
              }
            />
            {errors.passwordConfirm && (
              <span className="error-message">
                {errors.passwordConfirm?.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="password-recovery-submit-btn"
          >
            {isSubmitting ? "Salvando" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecoveryContent;
