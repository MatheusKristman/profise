/* eslint-disable react/prop-types */
import React from "react";

import OrderBox from "./OrderBox";
import useAccountStore from "../../../../stores/useAccountStore";

const RecentsOrders = ({ orderData, setOrderSelected, setIsModalOpen }) => {
  const { user } = useAccountStore();

  return (
    <div className="general__recents-orders-container">
      <div className="general__recents-orders-container__box">
        <div className="general__recents-orders-container__box__head">
          <h5 className="general__recents-orders-container__box__head__title">
            Últimos Pedidos
          </h5>
        </div>

        <div className="general__recents-orders-container__box__body">
          {orderData.length > 0
            ? orderData
                .filter((order) => {
                  const hasOrder = user.ordersBuyed.filter(
                    (orderBuyed) => orderBuyed.orderId === order._id
                  );

                  if (hasOrder.length === 0) {
                    return order;
                  }
                })
                .map((order) => (
                  <OrderBox
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
};

export default RecentsOrders;
