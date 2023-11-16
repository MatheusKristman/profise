/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from "react";

import ContactBuyConfirmation from "./ContactBuyConfirmation";
import useAccountStore from "../../../../stores/useAccountStore";

function ResultModal({ orderSelected, setIsModalOpen }) {
  const [desc, setDesc] = useState("");
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [contactPrice, setContactPrice] = useState(50);

  const { user } = useAccountStore();
  const modalRef = useRef(null);

  useEffect(() => {
    if (Object.keys(orderSelected).length > 0) {
      setDesc(
        orderSelected.requestAnswers[orderSelected.requestAnswers.length - 1]
          .answer
      );
    }
  }, [orderSelected]);

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

  function handleConfirmation() {
    setConfirmationOpen(true);
  }

  return (
    <>
      <div onClick={handleCloseModal} className="result-modal" ref={modalRef}>
        <div className="box">
          <button
            type="button"
            className="close-btn"
            onClick={handleCloseModalBtn}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <div className="container">
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

            {user.ordersBuyed.some(
              (orderBuyed) => orderBuyed.orderId === orderSelected._id
            ) ? (
              <span className="contact buyed">
                {orderSelected.requesterContact}
              </span>
            ) : (
              <span onClick={handleConfirmation} className="contact not-buyed">
                <i className="fa-solid fa-coins" />{" "}
                {`${contactPrice} moedas para liberar contato`}
              </span>
            )}
          </div>
        </div>
      </div>
      {isConfirmationOpen && (
        <ContactBuyConfirmation
          setConfirmationOpen={setConfirmationOpen}
          contactPrice={contactPrice}
          orderId={orderSelected._id}
        />
      )}
    </>
  );
}

export default ResultModal;
