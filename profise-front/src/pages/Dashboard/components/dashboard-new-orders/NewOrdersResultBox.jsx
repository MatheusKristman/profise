import React from "react";

/* eslint-disable react/prop-types */
import normalize from "normalize-text";

import Result from "./Result";
import useAccountStore from "../../../../stores/useAccountStore";

function NewOrdersResultBox({
  orderData,
  setOrderSelected,
  setIsModalOpen,
  filter,
}) {
  const { user } = useAccountStore();

  const orderFiltered = orderData.filter((order) => {
    const hasOrder = user.ordersBuyed.filter(
      (orderBuyed) => orderBuyed.orderId === order._id
    );

    if (hasOrder.length === 0) {
      return order;
    }
  });

  return (
    <div className="new-orders__wrapper__result-box">
      <div className="new-orders__wrapper__result-box__container">
        <div className="new-orders__wrapper__result-box__container__upper">
          <span className="new-orders__wrapper__result-box__container__upper__orders-showing-text">
            Total de {orderFiltered.length} pedidos
          </span>
        </div>

        <div className="new-orders__wrapper__result-box__container__bottom">
          {/* {filter.city === "" */}
          {/*   ? orderData.map((order) => ( */}
          {/*     <Result */}
          {/*       key={order.id} */}
          {/*       name={order.name} */}
          {/*       city={order.city} */}
          {/*       desc={order.desc} */}
          {/*       cost={order.cost} */}
          {/*       id={order.id} */}
          {/*       handleResultSelected={handleResultSelected} */}
          {/*     /> */}
          {/*   )) */}
          {/*   : orderData */}
          {/*     .filter((order) => */}
          {/*       normalize(order.city.toLowerCase()).includes( */}
          {/*         normalize(filter.city.toLowerCase()) */}
          {/*       ) */}
          {/*     ) */}
          {/*     .map((order) => ( */}
          {/*       <Result */}
          {/*         key={order.id} */}
          {/*         name={order.name} */}
          {/*         city={order.city} */}
          {/*         desc={order.desc} */}
          {/*         cost={order.cost} */}
          {/*         id={order.id} */}
          {/*         handleResultSelected={handleResultSelected} */}
          {/*       /> */}
          {/*     ))} */}
          {orderData.length > 0
            ? orderFiltered.map((order) => (
                <Result
                  key={order._id}
                  order={order}
                  setOrderSelected={setOrderSelected}
                  setIsModalOpen={setIsModalOpen}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default NewOrdersResultBox;
