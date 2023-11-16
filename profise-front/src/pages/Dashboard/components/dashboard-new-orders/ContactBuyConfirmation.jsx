/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

import useAccountStore from "../../../../stores/useAccountStore";
import api from "../../../../services/api";

const ContactBuyConfirmation = ({
  setConfirmationOpen,
  contactPrice,
  orderId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();

  const { user, setUser } = useAccountStore();

  function handleCloseModalBtn() {
    modalRef.current.style.animation = "ResultFadeOut 0.4s ease forwards";

    setTimeout(() => {
      setConfirmationOpen(false);
    }, 400);
  }

  function handleCloseModal(e) {
    if (
      e.target.classList.contains("contact-buy-confirmation-overlay") &&
      !isLoading
    ) {
      handleCloseModalBtn();
    }
  }

  function handleConfirm() {
    if (user.coins === 0 || user.coins < contactPrice) {
      toast.error("Moedas insuficientes", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    setIsLoading(true);

    api
      .post("/professional/buy-contact", {
        contactPrice,
        id: user._id,
        orderId,
      })
      .then((res) => {
        setUser(res.data);
        handleCloseModalBtn();
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
    <div
      ref={modalRef}
      onClick={handleCloseModal}
      className="contact-buy-confirmation-overlay"
    >
      <div className="box">
        <button
          type="button"
          onClick={handleCloseModalBtn}
          disabled={isLoading}
          className="close-btn"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="info-wrapper">
          <h3 className="title">Deseja comprar esse contato?</h3>

          <div className="coins">
            <span>Saldo: {user.coins}</span>
            <i className="fa-solid fa-coins" />
          </div>

          <div className="btn-wrapper">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="buy-btn"
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={handleCloseModalBtn}
              disabled={isLoading}
              className="cancel-btn"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBuyConfirmation;
