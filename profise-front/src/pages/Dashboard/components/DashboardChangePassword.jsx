/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import changePasswordSchema from "../../../schemas/changePasswordSchema";
import useAccountStore from "../../../stores/useAccountStore";
import api from "../../../services/api";

function DashboardChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, setUser } = useAccountStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      actualPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  useEffect(() => {
    setValue("id", user._id);
  }, [user, setValue]);

  function onSubmit(data) {
    setIsSubmitting(true);

    api
      .put("/professional/change-password", data)
      .then((res) => {
        setUser(res.data.user);

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
      })
      .catch((error) => {
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
    <div className="change-password">
      <div className="change-password__container">
        <h2 className="change-password__container__title">Alterar senha</h2>

        <div className="change-password__container__box">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="change-password__container__box__form"
          >
            <label
              htmlFor="actualPassword"
              className="change-password__container__box__form__label"
            >
              Senha atual
              <input
                {...register("actualPassword")}
                type="password"
                id="actualPassword"
                name="actualPassword"
                style={
                  errors.actualPassword
                    ? { borderColor: "rgb(243, 50, 50)" }
                    : {}
                }
                className="change-password__container__box__form__label__input"
              />
              {errors.actualPassword && (
                <small className="error-message">
                  {errors.actualPassword?.message}
                </small>
              )}
            </label>

            <label
              htmlFor="newPassword"
              className="change-password__container__box__form__label"
            >
              Nova senha
              <input
                {...register("newPassword")}
                type="password"
                id="newPassword"
                name="newPassword"
                style={
                  errors.newPassword ? { borderColor: "rgb(243, 50, 50)" } : {}
                }
                className="change-password__container__box__form__label__input"
              />
              {errors.newPassword && (
                <small className="error-message">
                  {errors.newPassword?.message}
                </small>
              )}
            </label>

            <label
              htmlFor="newPasswordConfirm"
              className="change-password__container__box__form__label"
            >
              Confirmar nova senha
              <input
                {...register("newPasswordConfirm")}
                type="password"
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                style={
                  errors.newPasswordConfirm
                    ? { borderColor: "rgb(243, 50, 50)" }
                    : {}
                }
                className="change-password__container__box__form__label__input"
              />
              {errors.newPasswordConfirm && (
                <small className="error-message">
                  {errors.newPasswordConfirm?.message}
                </small>
              )}
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="change-password__container__box__form__submit-btn"
            >
              Alterar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardChangePassword;
