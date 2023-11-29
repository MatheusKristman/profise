import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import useIsUserLogged from "../../../hooks/useIsUserLogged";
import useAccountStore from "../../../stores/useAccountStore";

export default function PaymentSuccessContent() {
  const [coinQuant, setCoinQuant] = useState("");
  const [price, setPrice] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const { isUserLogged } = useAccountStore();

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    setCoinQuant(query.get("coin_quant"));
    setPrice(`R$ ${query.get("price")},00`);
    setPaymentDate(format(new Date(), "dd/MM/yyyy"));
  }, [location.search]);

  useIsUserLogged();

  return (
    <div className="payment-success-container wrapper">
      <div className="payment-success-check-box">
        <i className="fa-solid fa-check payment-success-check" />
      </div>

      <h1 className="payment-success-title">
        Seu Pagamento confirmado com sucesso!
      </h1>
      <span className="payment-success-desc">
        Parabéns, suas moedas foram resgatadas
      </span>

      <div className="payment-success-details-box">
        <div className="payment-success-details-wrapper">
          <span className="payment-success-details-header">Moedas</span>
          <span className="payment-success-details-info">{coinQuant}</span>
        </div>

        <div className="payment-success-details-wrapper">
          <span className="payment-success-details-header">
            Data de pagamento
          </span>
          <span className="payment-success-details-info">{paymentDate}</span>
        </div>

        <div className="payment-success-details-wrapper">
          <span className="payment-success-details-header">Valor</span>
          <span className="payment-success-details-info">{price}</span>
        </div>
      </div>

      <Link
        to={isUserLogged ? "/painel-de-controle/geral" : "/"}
        className="payment-success-back-button"
      >
        Voltar Para Painel
      </Link>
    </div>
  );
}
