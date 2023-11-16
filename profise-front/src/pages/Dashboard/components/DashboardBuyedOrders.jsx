import React, { useState, useRef, useEffect, useCallback } from "react";
import { subMonths, subYears, format } from "date-fns";

import BuyedOrderBox from "./dashboard-buyed-orders/BuyedOrderBox";
import Loading from "./dashboard-buyed-orders/Loading";
import SeeMoreModal from "./dashboard-buyed-orders/SeeMoreModal";
import useAccountStore from "../../../stores/useAccountStore";
import api from "../../../services/api";

function DashboardBuyedOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("Ultimos 6 Meses");
  const [filterDate, setFilterDate] = useState(subMonths(new Date(), 6));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});

  const { user, setUser } = useAccountStore();

  useEffect(() => {
    if (user.hasOwnProperty("_id")) {
      setIsLoading(true);
      setIsLoadingAnimation(true);

      api
        .post("/professional/get-buyed-orders", {
          userId: user._id,
          dateFilter: filterDate,
        })
        .then((res) => {
          let orders = res.data;

          setOrders(orders);
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
    }
  }, [filterDate, user]);

  const filterRef = useRef(null);
  const filterBtnRef = useRef(null);

  const handleFilter = useCallback(() => {
    filterBtnRef.current.style.pointerEvents = "none";

    if (!isFilterOpen) {
      setIsFilterOpen(true);

      setTimeout(() => {
        filterBtnRef.current.style.pointerEvents = "unset";
      }, 400);
      return;
    }

    filterRef.current.style.animation = "filterOff 0.4s ease forwards";

    setTimeout(() => {
      setIsFilterOpen(false);
      filterBtnRef.current.style.pointerEvents = "unset";
    }, 400);
  }, [isFilterOpen]);

  const handleFilterKeyboard = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleFilter();
      }
    },
    [handleFilter]
  );

  const handleFilterSelect = useCallback((e, filter) => {
    if (
      e.target.classList.contains(
        "container__header__filter-btn__options-box__option"
      )
    ) {
      setFilterValue(e.target.textContent);
      setFilterDate(filter);
    }
  }, []);

  const handleFilterSelectKeyboard = useCallback(
    (e, filter) => {
      if (e.key === "Enter") {
        handleFilterSelect(e, filter);
      }
    },
    [handleFilterSelect]
  );

  return (
    <div className="buyed-orders">
      <h2 className="buyed-orders__title">Pedidos Comprados</h2>

      <div className="container">
        <div className="container__header">
          <div
            className="container__header__filter-btn"
            onClick={handleFilter}
            onKeyDown={handleFilterKeyboard}
            role="button"
            tabIndex="0"
            ref={filterBtnRef}
          >
            <span className="container__header__filter-btn__value">
              {filterValue}
            </span>
            <button
              type="button"
              className={`container__header__filter-btn__btn ${
                isFilterOpen ? "btn-open" : ""
              }`}
            >
              <i className="fa-solid fa-chevron-down" />
            </button>

            {isFilterOpen ? (
              <ul
                ref={filterRef}
                className="container__header__filter-btn__options-box"
              >
                <li
                  onClick={(e) =>
                    handleFilterSelect(e, subMonths(new Date(), 6))
                  }
                  onKeyDown={(e) =>
                    handleFilterSelectKeyboard(e, subMonths(new Date(), 6))
                  }
                  role="option"
                  aria-selected={filterValue === "Últimos 6 Meses"}
                  className="container__header__filter-btn__options-box__option"
                  tabIndex={0}
                >
                  Últimos 6 Meses
                </li>
                <li
                  onClick={(e) =>
                    handleFilterSelect(e, subMonths(new Date(), 12))
                  }
                  onKeyDown={(e) =>
                    handleFilterSelectKeyboard(e, subMonths(new Date(), 12))
                  }
                  role="option"
                  aria-selected={filterValue === "Últimos 12 Meses"}
                  className="container__header__filter-btn__options-box__option"
                  tabIndex={0}
                >
                  Últimos 12 Meses
                </li>
                <li
                  onClick={(e) =>
                    handleFilterSelect(e, subMonths(new Date(), 16))
                  }
                  onKeyDown={(e) =>
                    handleFilterSelectKeyboard(e, subMonths(new Date(), 16))
                  }
                  role="option"
                  aria-selected={filterValue === "Últimos 16 Meses"}
                  className="container__header__filter-btn__options-box__option"
                  tabIndex={0}
                >
                  Últimos 16 Meses
                </li>
                <li
                  onClick={(e) =>
                    handleFilterSelect(e, subMonths(new Date(), 24))
                  }
                  onKeyDown={(e) =>
                    handleFilterSelectKeyboard(e, subMonths(new Date(), 24))
                  }
                  role="option"
                  aria-selected={filterValue === "Últimos 24 Meses"}
                  className="container__header__filter-btn__options-box__option"
                  tabIndex={0}
                >
                  Últimos 24 Meses
                </li>
                <li
                  onClick={(e) =>
                    handleFilterSelect(e, subYears(new Date(), 5))
                  }
                  onKeyDown={(e) =>
                    handleFilterSelectKeyboard(e, subYears(new Date(), 5))
                  }
                  role="option"
                  aria-selected={filterValue === "Últimos 5 Anos"}
                  className="container__header__filter-btn__options-box__option"
                  tabIndex={0}
                >
                  Últimos 5 Anos
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        <div className="body">
          {orders.length > 0 && !isLoadingAnimation ? (
            orders.map((order, index) => (
              <BuyedOrderBox
                key={order._id}
                order={order}
                setOrderSelected={setOrderSelected}
                setIsModalOpen={setIsModalOpen}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ))
          ) : (
            <div>
              <span>Nenhum pedido comprado no momento</span>
            </div>
          )}
        </div>
        {isModalOpen && (
          <SeeMoreModal
            orderSelected={orderSelected}
            setIsModalOpen={setIsModalOpen}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>

      {isLoading && <Loading isLoadingAnimation={isLoadingAnimation} />}
    </div>
  );
}

export default DashboardBuyedOrders;
