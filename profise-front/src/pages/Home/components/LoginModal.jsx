/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Context from "../../../Context";
import useHeaderStore from "../../../stores/useHeaderStore";
import loginSchema from "../../../schemas/loginSchema";
import api from "../../../services/api";

function LoginModal() {
  const { loginModalRef } = useContext(Context);

  const { closeLoginMenu } = useHeaderStore((state) => ({
    closeLoginMenu: state.closeLoginMenu,
  }));
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(loginSchema),
  });

  function closeModal() {
    loginModalRef.current.style.animation = "LoginFadeOut 0.4s ease forwards";

    setTimeout(() => {
      closeLoginMenu();
    }, 400);
  }

  function handleRemember(event) {
    if (event.target.checked) {
      return setValue("remember", true);
    }

    return setValue("remember", false);
  }

  function handleChangePassword() {
    closeModal();

    setTimeout(() => {
      navigate("/esqueci-a-senha");
    }, 350);
  }

  function handleCreateAccount() {
    closeModal();

    setTimeout(() => {
      navigate("/cadastro-profissional");
    }, 350);
  }

  function onSubmit(data) {
    setIsLoading(true);

    api
      .post("/user/login", data)
      .then((res) => {
        localStorage.setItem("userToken", res.data);

        window.location.reload();
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
      .finally(() => setIsLoading(false));
  }

  return (
    <div ref={loginModalRef} className="login-modal-overlay">
      <div className="login-modal-overlay__box">
        <button type="button" onClick={closeModal} className="login-modal-overlay__box__close-btn">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="login-modal-overlay__box__container">
          <h3 className="login-modal-title">Entre na sua conta</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="login-modal-form">
            <label htmlFor="username" className="login-modal-form__username-label">
              E-mail
              <input
                {...register("email")}
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                style={errors.email ? { borderColor: "rgb(243, 50, 50)" } : {}}
                className="login-modal-form__username-label__input"
              />
              {errors.email && <small className="error-message">{errors.email?.message}</small>}
            </label>
            <label htmlFor="password" className="login-modal-form__password-label">
              Senha
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                style={errors.password ? { borderColor: "rgb(243, 50, 50)" } : {}}
                className="login-modal-form__password-label__input"
              />
              {errors.password && (
                <small className="error-message">{errors.password?.message}</small>
              )}
            </label>

            <div className="login-modal-form__remember-forgot-container">
              <label
                htmlFor="remember"
                className="login-modal-form__remember-forgot-container__remember-label"
              >
                <input
                  {...register("remember")}
                  disabled={isLoading}
                  onChange={handleRemember}
                  autoComplete="off"
                  autoCorrect="off"
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="login-modal-form__remember-forgot-container__remember-label__input"
                />
                <span className="custom-checkbox" />
                Lembrar de mim
              </label>
              <button
                onClick={handleChangePassword}
                type="button"
                className="login-modal-form__remember-forgot-container__forgot-btn"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="login-modal-form__submit-btn">
              Entrar
            </button>
          </form>

          <span className="create-account-link">
            Não tem conta?{" "}
            <strong role="link" onClick={handleCreateAccount}>
              Crie sua conta
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
