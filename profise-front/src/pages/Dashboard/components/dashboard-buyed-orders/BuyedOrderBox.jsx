/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

import api from "../../../../services/api";
import useAccountStore from "../../../../stores/useAccountStore";

import "react-tooltip/dist/react-tooltip.css";

const BuyedOrderBox = ({ order, setOrderSelected, setIsModalOpen, isLoading, setIsLoading }) => {
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const { user, setUser } = useAccountStore();

  function handleOrderSelected(id) {
    setIsLoadingModal(true);

    api
      .post("/order/get-selected-order", { id })
      .then((res) => {
        setOrderSelected({
          ...res.data,
          city: order.city,
          state: order.state,
          isConcluded: order.isConcluded,
        });
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error(error);

        toast.error(
          "Ocorreu um erro durante a visualização dos detalhes do pedido, tente novamente mais tarde",
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
      })
      .finally(() => {
        setIsLoadingModal(false);
      });
  }

  function handleConcludeOrder() {
    setIsLoading(true);

    api
      .post("professional/conclude-order", {
        id: user._id,
        orderId: order.orderId,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="buyed-orders-container">
      <div className="info-box">
        <h4 className="requester-name">{order.requesterName}</h4>

        <div className="details-wrapper">
          <span className="details-category">{order.category}</span>
          <span className="details-location">{`${order.state}/${order.city}`}</span>
        </div>

        <div className="subcategory-wrapper">
          {order.requestAnswers.slice(0, 3).map((item, index) =>
            index !== order.requestAnswers.length - 1 ? (
              <span key={item.question} className="subcategory">
                {typeof item.answer === "object" ? item.answer.join("/") : item.answer}
              </span>
            ) : null
          )}
        </div>
      </div>

      <div className="btn-wrapper">
        <button
          data-tooltip-id="see-more-tooltip"
          data-tooltip-content="Ver mais"
          onClick={() => handleOrderSelected(order.orderId)}
          disabled={isLoadingModal}
          type="button"
          className="see-more-btn"
        >
          <i className="fa-regular fa-eye" />
        </button>

        <Tooltip id="see-more-tooltip" />

        {order.isConcluded ? (
          <button
            data-tooltip-id="concluded-tooltip"
            data-tooltip-content="Marcar como concluído"
            disabled
            type="button"
            className="concluded-btn concluded"
          >
            <i className="fa-solid fa-check" />
            Concluído
          </button>
        ) : (
          <>
            <button
              data-tooltip-id="concluded-tooltip"
              data-tooltip-content="Marcar como concluído"
              disabled={isLoadingModal}
              onClick={handleConcludeOrder}
              type="button"
              className="concluded-btn"
            >
              <i className="fa-solid fa-check" />
            </button>

            <Tooltip id="concluded-tooltip" />
          </>
        )}
      </div>
    </div>
  );
};

export default BuyedOrderBox;
