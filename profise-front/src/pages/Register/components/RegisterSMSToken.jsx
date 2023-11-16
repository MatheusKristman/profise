/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useRegisterStore from "../../../stores/useRegisterStore";
import api from "../../../services/api";

function RegisterSMSToken() {
  const {
    nameValue,
    celValue,
    emailValue,
    isSMSTokenOpen,
    SMSTokenNotOpened,
    sendAgainTimer,
    setSendAgainTimer,
    sendAgain,
    toSendAgain,
    toDontSendAgain,
  } = useRegisterStore((state) => ({
    nameValue: state.nameValue,
    celValue: state.celValue,
    emailValue: state.emailValue,
    isSMSTokenOpen: state.isSMSTokenOpen,
    SMSTokenNotOpened: state.SMSTokenNotOpened,
    sendAgainTimer: state.sendAgainTimer,
    setSendAgainTimer: state.setSendAgainTimer,
    sendAgain: state.sendAgain,
    toSendAgain: state.toSendAgain,
    toDontSendAgain: state.toDontSendAgain,
  }));

  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const SMSTokenRef = useRef(null);

  function closeModal() {
    SMSTokenRef.current.style.animation = "SMSTokenFadeOut 0.4s ease forwards";

    setTimeout(() => {
      SMSTokenNotOpened();
    }, 400);
  }

  function handleSendAgain() {
    toSendAgain();
  }

  function confirmSMSCode(event) {
    event.preventDefault();

    setIsLoading(true);

    const data = {
      phoneNumber: celValue.replace(/\D/g, ""),
      cel: celValue,
      name: nameValue,
      email: emailValue,
      otp: token,
    };

    api
      .post("/professional/verify-register-otp", data)
      .then((res) => {
        if (res.data.confirmed) {
          closeModal();

          navigate(`/completar-cadastro-profissional?id=${res.data.id}`);
        } else {
          toast.error("Ocorreu um erro, tente novamente mais tarde", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (isSMSTokenOpen) {
      toSendAgain();
    }
  }, [isSMSTokenOpen, toSendAgain, celValue]);

  useEffect(() => {
    const sendSMSCode = () => {
      api
        .post("/professional/send-otp", {
          phoneNumber: celValue.replace(/\D/g, ""),
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

          toDontSendAgain();
        })
        .finally(() => {
          let timer = 10;
          setSendAgainTimer(timer);

          const timerHandler = setInterval(() => {
            timer -= 1;
            setSendAgainTimer(timer);

            if (timer === 0) {
              clearInterval(timerHandler);
              toDontSendAgain();
            }
          }, 1000);
        });
    };
    if (sendAgain) {
      sendSMSCode();
    }
  }, [sendAgain, setSendAgainTimer, toDontSendAgain, celValue]);

  return (
    <div ref={SMSTokenRef} onSubmit={confirmSMSCode} className="sms-token-overlay">
      <div className="sms-token-overlay__box">
        <button type="button" onClick={closeModal} className="sms-token-overlay__box__close-btn">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="sms-token-overlay__box__container">
          <h3 className="sms-token-overlay__box__container__title">Confirmação de celefone</h3>

          <form className="sms-token-overlay__box__container__form">
            <label htmlFor="token" className="sms-token-overlay__box__container__form__token-label">
              {`Enviamos um código de verificação para ${celValue}`}
              <input
                type="text"
                name="token"
                id="token"
                placeholder="Digite o código"
                maxLength={6}
                value={token}
                onChange={(event) => setToken(event.target.value)}
                autoComplete="off"
                autoCorrect="off"
                className="sms-token-overlay__box__container__form__token-label__input"
              />
            </label>

            <button
              type="button"
              className={
                sendAgainTimer > 0
                  ? "sms-token-overlay__box__container__form__token-label__timer-on"
                  : "sms-token-overlay__box__container__form__token-label__send-again-btn"
              }
              onClick={handleSendAgain}
            >
              {`Enviar SMS novamente ${sendAgainTimer > 0 ? `(${sendAgainTimer})` : ""}`}
            </button>

            <button
              type="submit"
              disabled={token.length < 6 || isLoading}
              className="sms-token-overlay__box__container__form__token-label__submit-btn"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterSMSToken;
