import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useAccountStore from "../../../../stores/useAccountStore";
import api from "../../../../services/api";

/* eslint-disable react/prop-types */
function FilterBox({
  filter,
  setFilter,
  city,
  state,
  setOrderData,
  setIsLoading,
}) {
  const [actualFilter, setActualFilter] = useState(filter);
  const [filterChanged, setFilterChanged] = useState(false);

  const { user } = useAccountStore();

  useEffect(() => {
    if (filter !== actualFilter) {
      setFilterChanged(true);
    }
  }, [filter]);

  function handleDistanceFilter(e) {
    setFilter(e.target.value);
  }

  function submitFilter() {
    setActualFilter(filter);
    setFilterChanged(false);
    setIsLoading(true);

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
        setIsLoading(false);
      });
  }

  return (
    <div className="new-orders__wrapper__filter-box">
      <div className="new-orders__wrapper__filter-box__container">
        <label
          htmlFor="location"
          className="new-orders__wrapper__filter-box__container__location-label"
        >
          Cidade
          <input
            type="text"
            id="location"
            name="location"
            value={`${city}/${state}`}
            readOnly
            className="new-orders__wrapper__filter-box__container__location-label__input"
          />
        </label>

        <div className="new-orders__wrapper__filter-box__container__distance-wrapper">
          <span className="new-orders__wrapper__filter-box__container__distance-wrapper__distance-label">
            Distancia do serviço
          </span>
          <input
            type="range"
            min={1}
            max={100}
            value={filter}
            onChange={handleDistanceFilter}
            name="distance"
            className="new-orders__wrapper__filter-box__container__distance-wrapper__distance-input"
          />

          <div className="new-orders__wrapper__filter-box__container__distance-wrapper__distance-value">
            {`${filter}km`}
          </div>

          {filterChanged && (
            <button
              className="new-orders__wrapper__filter-box__container__distance-wrapper__distance-btn"
              type="button"
              onClick={submitFilter}
            >
              Aplicar Filtro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
