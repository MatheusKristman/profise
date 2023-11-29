import React, { useState, useEffect } from "react";

import RecentsOrders from "./dashboard-general/RecentsOrders";
import ResultModal from "./dashboard-new-orders/ResultModal";
import useAccountStore from "../../../stores/useAccountStore";
import Loading from "./dashboard-general/Loading";
import api from "../../../services/api";
import { toast } from "react-toastify";

function DashboardGeneral() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [rate, setRate] = useState(0);

  const { user } = useAccountStore();

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingAnimation(true);

    if (Object.keys(user).length > 0) {
      api
        .post("/order/get-orders", {
          distance: 100,
          lat: user.latitude,
          long: user.longitude,
          categoryId: user.service.categoryId,
        })
        .then((res) => {
          setOrderData(res.data);
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
          setIsLoadingAnimation(false);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });

      const orders = user.ordersBuyed.filter((order) => order.hasOwnProperty("orderReview"));
      let rateSum = 0;

      for (let i = 0; i < orders.length; i++) {
        rateSum += orders[i].orderReview.rate;
      }

      setRate(rateSum);
      setReviewTotal(orders.length);
    }
  }, [user]);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isModalOpen]);

  return (
    <div className="general">
      <div className="general__statistics-container">
        <div className="general__statistics-container__leads-buyed">
          <div className="general__statistics-container__leads-buyed__image-box">
            <i className="general__statistics-container__leads-buyed__image-box__image fa-solid fa-chart-pie"></i>
          </div>

          <div className="general__statistics-container__leads-buyed__info-box">
            <h3 className="general__statistics-container__leads-buyed__info-box__title">
              {user?.ordersBuyed?.length}
            </h3>
            <span className="general__statistics-container__leads-buyed__info-box__desc">
              Pedidos Comprados
            </span>
          </div>
        </div>

        <div className="general__statistics-container__coins-quant">
          <div className="general__statistics-container__coins-quant__image-box">
            <i className="general__statistics-container__coins-quant__image-box__image fa-solid fa-coins"></i>
          </div>

          <div className="general__statistics-container__coins-quant__info-box">
            <h3 className="general__statistics-container__coins-quant__info-box__title">
              {user.coins}
            </h3>
            <span className="general__statistics-container__coins-quant__info-box__desc">
              Moedas
            </span>
          </div>
        </div>

        <div className="general__statistics-container__general-rating">
          <div className="general__statistics-container__general-rating__image-box">
            <i className="general__statistics-container__general-rating__image-box__image fa-regular fa-star"></i>
          </div>

          <div className="general__statistics-container__general-rating__info-box">
            <h3 className="general__statistics-container__general-rating__info-box__title">
              {rate / reviewTotal} / 5
            </h3>
            <span className="general__statistics-container__general-rating__info-box__desc">
              Pontuação Geral
            </span>
          </div>
        </div>
      </div>

      <RecentsOrders
        orderData={orderData}
        setOrderSelected={setOrderSelected}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && <ResultModal orderSelected={orderSelected} setIsModalOpen={setIsModalOpen} />}
      {isLoading && <Loading isLoadingAnimation={isLoadingAnimation} />}
    </div>
  );
}

export default DashboardGeneral;
