import React, { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
import axios from "axios";
import useAccountStore from "../../../../stores/useAccountStore";

function Result({ order, setOrderSelected, setIsModalOpen }) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const { user } = useAccountStore();

  const desc = order.requestAnswers[order.requestAnswers.length - 1].answer;

  useEffect(() => {
    axios
      .get(
        `https://viacep.com.br/ws/${order.requesterLocation.cep.replace(
          "-",
          ""
        )}/json/`
      )
      .then((res) => {
        setCity(res.data.uf);
        setState(res.data.localidade);
      })
      .catch((error) => {
        console.error(error);

        toast.error(
          "Ocorreu um erro durante a busca do cep, tente novamente mais tarde.",
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
      });
  }, []);

  function handleResultSelected(order) {
    setIsModalOpen(true);
    setOrderSelected({ ...order, city, state });
  }

  return (
    <div className="new-orders__wrapper__result-box__container__bottom__result">
      <div className="new-orders__wrapper__result-box__container__bottom__result__info">
        <h3 className="new-orders__wrapper__result-box__container__bottom__result__info__name">
          {order.requesterName}
        </h3>

        <span className="new-orders__wrapper__result-box__container__bottom__result__info__city">
          {state + "/" + city}
        </span>

        <p className="new-orders__wrapper__result-box__container__bottom__result__info__desc">
          {`${desc.length > 100 ? desc.slice(0, 100) + "..." : desc}`}
        </p>
      </div>

      <div className="new-orders__wrapper__result-box__container__bottom__result__detail-wrapper">
        {user.ordersBuyed?.some(
          (orderBuyed) => orderBuyed.orderId === order._id
        ) && (
          <span className="new-orders__wrapper__result-box__container__bottom__result__detail-wrapper__contact-buyed">
            Contato Comprado
          </span>
        )}

        <button
          type="button"
          className="new-orders__wrapper__result-box__container__bottom__result__detail-wrapper__detail-btn"
          onClick={() => handleResultSelected(order)}
        >
          Ver pedido
        </button>
      </div>
    </div>
  );
}

export default Result;
