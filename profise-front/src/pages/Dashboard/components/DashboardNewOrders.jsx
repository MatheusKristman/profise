/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";
import FilterBox from "./dashboard-new-orders/FilterBox";
import NewOrdersResultBox from "./dashboard-new-orders/NewOrdersResultBox";
import ResultModal from "./dashboard-new-orders/ResultModal";
import Loading from "./dashboard-new-orders/Loading";
import useAccountStore from "../../../stores/useAccountStore";

function DashboardNewOrders() {
  const [orderData, setOrderData] = useState([]);
  const [orderSelected, setOrderSelected] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");

  const { user } = useAccountStore();

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingAnimation(true);
    setUserCity(user.city);
    setUserState(user.state);

    if (Object.keys(user).length > 0) {
      api
        .post("/order/get-orders", {
          distance: filter,
          lat: user.latitude,
          long: user.longitude,
          categoryId: user.service.categoryId,
        })
        .then((res) => {
          setOrderData(res.data);
        })
        .catch((error) => {
          console.log(error);

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
    <>
      <div className="new-orders">
        <h2 className="new-orders__title">Novos Pedidos</h2>

        <div className="new-orders__wrapper">
          <FilterBox
            filter={filter}
            setFilter={setFilter}
            city={userCity}
            state={userState}
            setOrderData={setOrderData}
            setIsLoading={setIsLoading}
          />
          <NewOrdersResultBox
            orderData={orderData}
            setOrderSelected={setOrderSelected}
            setIsModalOpen={setIsModalOpen}
            filter={filter}
          />
          {isModalOpen && (
            <ResultModal
              orderSelected={orderSelected}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      </div>
      {isLoading && <Loading isLoadingAnimation={isLoadingAnimation} />}
    </>
  );
}

export default DashboardNewOrders;
