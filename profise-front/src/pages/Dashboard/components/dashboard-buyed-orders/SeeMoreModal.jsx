/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from "react";

import api from "../../../../services/api";
import useAccountStore from "../../../../stores/useAccountStore";

function SeeMoreModal({
  orderSelected,
  setIsModalOpen,
  isLoading,
  setIsLoading,
}) {
  const [isConcluded, setIsConcluded] = useState(orderSelected.isConcluded);

  const modalRef = useRef(null);

  const { user, setUser } = useAccountStore();

  const desc =
    orderSelected.requestAnswers[orderSelected.requestAnswers.length - 1]
      .answer;

  function handleCloseModalBtn() {
    modalRef.current.style.animation = "ResultFadeOut 0.4s ease forwards";

    setTimeout(() => {
      setIsModalOpen(false);
    }, 400);
  }

  function handleCloseModal(e) {
    if (e.target.classList.contains("new-orders__wrapper__result-modal")) {
      handleCloseModalBtn();
    }
  }

  function handleConcludeOrder() {
    setIsLoading(true);

    api
      .post("professional/conclude-order", {
        id: user._id,
        orderId: orderSelected._id,
      })
      .then((res) => {
        setUser(res.data);
        setIsConcluded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div onClick={handleCloseModal} className="see-more-modal" ref={modalRef}>
        <div className="box">
          <button
            type="button"
            className="close-btn"
            onClick={handleCloseModalBtn}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <div className="see-more-container">
            <h3 className="title">{orderSelected.requesterName}</h3>

            <span className="city">
              {orderSelected.state + "/" + orderSelected.city}
            </span>

            <p className="desc">{desc}</p>

            <div className="filter-wrapper">
              {orderSelected.requestAnswers.map((item, index) =>
                index !== orderSelected.requestAnswers.length - 1 ? (
                  <span key={item.question} className="filter-bubble">
                    {typeof item.answer === "object"
                      ? item.answer.join(" / ")
                      : item.answer}
                  </span>
                ) : null
              )}
            </div>

            <div className="btns-wrapper">
              <span className="contact buyed">
                {orderSelected.requesterContact}
              </span>
              <button
                type="button"
                className={`concluded-btn ${isConcluded && "concluded"}`}
                disabled={isConcluded || isLoading}
                onClick={handleConcludeOrder}
              >
                <i className="fa-solid fa-check" />
                {isConcluded
                  ? "Marcado como concluído"
                  : "Marcar como concluído"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SeeMoreModal;
