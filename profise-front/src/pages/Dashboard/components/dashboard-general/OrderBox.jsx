/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import useAccountStore from "../../../../stores/useAccountStore";

const OrderBox = ({ order, setOrderSelected, setIsModalOpen }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { user } = useAccountStore();

  const desc = order.requestAnswers[order.requestAnswers.length - 1].answer;

  useEffect(() => {
    axios
      .get(`https://viacep.com.br/ws/${order.requesterLocation.cep.replace("-", "")}/json/`)
      .then((res) => {
        setCity(res.data.uf);
        setState(res.data.localidade);
      })
      .catch((error) => {
        console.error(error);

        toast.error("Ocorreu um erro durante a busca do cep, tente novamente mais tarde", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  function handleResultSelected(order) {
    setOrderSelected({ ...order, city, state });
    setIsModalOpen(true);
  }

  return (
    <div className="order-box">
      <div className="info-box">
        <h4 className="requester-name">{order.requesterName}</h4>

        <div className="details-wrapper">
          <span className="details-category">{order.category}</span>

          <span className="details-location">{`${state}/${city}`}</span>
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

      <button onClick={() => handleResultSelected(order)} type="button" className="see-more-btn">
        Ver mais
      </button>
    </div>
  );
};

export default OrderBox;
