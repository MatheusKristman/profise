/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { subMonths, subYears, format } from "date-fns";
import { toast } from "react-toastify";
import axios from "axios";

import images from "../../../../assets";
import useAccountStore from "../../../../stores/useAccountStore";
import api from "../../../../services/api";
import SeeMoreModal from "./SeeMoreModal";

function DashboardTable({
  title,
  headRow,
  gridStyle,
  setIsLoading,
  isLoading,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("Ultimos 6 Meses");
  const [filterDate, setFilterDate] = useState(subMonths(new Date(), 6));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState({});
  const [isSelecting, setIsSelecting] = useState(false);

  const { user, setUser } = useAccountStore();

  useEffect(() => {
    if (user.hasOwnProperty("_id")) {
      setIsLoading(true);

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
          setIsLoading(false);
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

  const handleViewMore = (id) => {
    setIsSelecting(true);
    api
      .post("order/get-selected-order", { id })
      .then((res) => {
        const order = res.data;

        axios
          .get(
            `https://viacep.com.br/ws/${order.requesterLocation.cep.replace(
              "-",
              ""
            )}/json/`
          )
          .then((res) => {
            setOrderSelected({
              ...order,
              city: res.data.uf,
              state: res.data.localidade,
            });
            setIsModalOpen(true);
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
        setIsSelecting(false);
      });
  };

  const handleDeleteContact = (orderId) => {
    setIsSelecting(true);
    api
      .put("/professional/delete-buyed-order", { userId: user._id, orderId })
      .then((res) => {
        setUser(res.data);
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
        setIsSelecting(false);
      });
  };

  return (
    <div className="container">
      <div className="container__header">
        <h4 className="container__header__title">{title}</h4>

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
          <button type="button" className="container__header__filter-btn__btn">
            <i className="fa-solid fa-chevron-down" />
          </button>

          {isFilterOpen ? (
            <ul
              ref={filterRef}
              className="container__header__filter-btn__options-box"
            >
              <li
                onClick={(e) => handleFilterSelect(e, subMonths(new Date(), 6))}
                onKeyDown={(e) =>
                  handleFilterSelectKeyboard(e, subMonths(new Date(), 6))
                }
                role="option"
                aria-selected={filterValue === "Ultimos 6 Meses"}
                className="container__header__filter-btn__options-box__option"
                tabIndex={0}
              >
                Ultimos 6 Meses
              </li>
              <li
                onClick={(e) =>
                  handleFilterSelect(e, subMonths(new Date(), 12))
                }
                onKeyDown={(e) =>
                  handleFilterSelectKeyboard(e, subMonths(new Date(), 12))
                }
                role="option"
                aria-selected={filterValue === "Ultimos 12 Meses"}
                className="container__header__filter-btn__options-box__option"
                tabIndex={0}
              >
                Ultimos 12 Meses
              </li>
              <li
                onClick={(e) =>
                  handleFilterSelect(e, subMonths(new Date(), 16))
                }
                onKeyDown={(e) =>
                  handleFilterSelectKeyboard(e, subMonths(new Date(), 16))
                }
                role="option"
                aria-selected={filterValue === "Ultimos 16 Meses"}
                className="container__header__filter-btn__options-box__option"
                tabIndex={0}
              >
                Ultimos 16 Meses
              </li>
              <li
                onClick={(e) =>
                  handleFilterSelect(e, subMonths(new Date(), 24))
                }
                onKeyDown={(e) =>
                  handleFilterSelectKeyboard(e, subMonths(new Date(), 24))
                }
                role="option"
                aria-selected={filterValue === "Ultimos 24 Meses"}
                className="container__header__filter-btn__options-box__option"
                tabIndex={0}
              >
                Ultimos 24 Meses
              </li>
              <li
                onClick={(e) => handleFilterSelect(e, subYears(new Date(), 5))}
                onKeyDown={(e) =>
                  handleFilterSelectKeyboard(e, subYears(new Date(), 5))
                }
                role="option"
                aria-selected={filterValue === "Ultimos 5 Anos"}
                className="container__header__filter-btn__options-box__option"
                tabIndex={0}
              >
                Ultimos 5 Anos
              </li>
            </ul>
          ) : null}
        </div>
      </div>
      <table className="container__content-box">
        <thead className="container__content-box__header">
          <tr
            className="container__content-box__header__row"
            style={{ gridTemplateColumns: gridStyle }}
          >
            {headRow.map((headText) => (
              <th
                key={headText}
                className="container__content-box__header__row__text"
              >
                {headText}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="container__content-box__body">
          {orders.length > 0 && !isLoading ? (
            orders.map((order, index) => (
              <tr
                key={`bodyText-${index}`}
                className="container__content-box__body__row"
                style={{ gridTemplateColumns: gridStyle }}
              >
                <td
                  data-label={headRow[0]}
                  className="container__content-box__body__row__job-title"
                  style={{ gridColumn: "1 / 2" }}
                >
                  <div className="container__content-box__body__row__job-title__content">
                    <span className="container__content-box__body__row__job-title__content__title">
                      {order.requesterName}
                    </span>
                    <div className="container__content-box__body__row__job-title__content__wrapper">
                      <span className="container__content-box__body__row__job-title__content__wrapper__segment">
                        <img
                          src={images.segment}
                          alt="Segmento"
                          className="container__content-box__body__row__job-title__content__wrapper__segment__icon"
                        />
                        {order.category}
                      </span>
                      <span className="container__content-box__body__row__job-title__content__wrapper__location">
                        <img
                          src={images.pin}
                          alt="Local"
                          className="container__content-box__body__row__job-title__content__wrapper__location__icon"
                        />
                        {`${order?.state ?? "Estado"}/${
                          order?.city ?? "Cidade"
                        }`}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  data-label={headRow[1]}
                  className="container__content-box__body__row__date-applied"
                >
                  <span className="container__content-box__body__row__date-applied__content">
                    {format(new Date(order.createdAt), "dd/MM/yyyy")}
                  </span>
                </td>
                <td
                  data-label={headRow[2]}
                  className="container__content-box__body__row__action"
                >
                  <div className="container__content-box__body__row__action__content">
                    <button
                      type="button"
                      onClick={() => handleViewMore(order.orderId)}
                      disabled={isSelecting}
                      className="container__content-box__body__row__action__content__view-btn"
                    >
                      <i className="fa-regular fa-eye" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteContact(order.id)}
                      disabled={isSelecting}
                      className="container__content-box__body__row__action__content__delete-btn"
                    >
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="container__content-box__body__row">
              <td className="container__content-box__body__row__no-order">
                Nenhum pedido comprado no momento
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <SeeMoreModal
          orderSelected={orderSelected}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default DashboardTable;
