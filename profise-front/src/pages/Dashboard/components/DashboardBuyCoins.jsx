/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

// TODO verificar api de pagamento, depois do checkout, não manda para a pagina novamente, provavelmente no backend também

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAccountStore from "../../../stores/useAccountStore";
import useCheckoutStore from "../../../stores/useCheckoutStore";

function Plan({ name, coins, price, benefits, recommended, coinQuantity, cost }) {
  const { setCoinQuant, setCost } = useCheckoutStore();

  const navigate = useNavigate();

  async function handleBuy(coinQuant, cost) {
    setCoinQuant(coinQuant);
    setCost(cost);

    navigate("/resumo-da-compra");
  }

  return (
    <div
      className={
        recommended
          ? "buy-coins__container__plan-wrapper__plan-box recommended"
          : "buy-coins__container__plan-wrapper__plan-box"
      }
    >
      <span className="buy-coins__container__plan-wrapper__plan-box__name">
        {name} <i className="fa-solid fa-coins" />
      </span>

      {recommended ? <span className="recommended-tag">Recomendado</span> : null}

      <span className="buy-coins__container__plan-wrapper__plan-box__price">
        <strong>{coins}</strong> / {price}
      </span>

      {benefits.map((benefit, index) => (
        <span
          key={`benefit-${index + 1}`}
          className="buy-coins__container__plan-wrapper__plan-box__benefits"
        >
          <i className="fa-solid fa-check" /> {benefit}
        </span>
      ))}

      <button
        type="button"
        onClick={() => handleBuy(coinQuantity, cost)}
        className="buy-coins__container__plan-wrapper__plan-box__buy-btn"
      >
        Comprar
      </button>
    </div>
  );
}

function DashboardBuyCoins() {
  const { user } = useAccountStore();

  return (
    <div className="buy-coins">
      <h2 className="buy-coins__title">Compra de Moedas</h2>

      <div className="buy-coins__container">
        <span className="buy-coins__container__balance">
          Saldo em moedas: {user?.coins} <i className="fa-solid fa-coins" />
        </span>

        <div className="buy-coins__container__plan-wrapper">
          <Plan
            name="Bronze"
            coins="300 moedas"
            price="R$ 80,00"
            benefits={["Receba 1 orçamento", "Acesso ao painel administrativo"]}
            recommended={false}
            coinQuantity={300}
            cost={80}
          />
          <Plan
            name="Prata"
            coins="600 moedas"
            price="R$ 120,00"
            benefits={[
              "Receba até 2 orçamentos",
              "Acesso ao painel administrativo",
              "Acesso a loja de pedidos",
              "Suporte especializado 24/7",
            ]}
            recommended
            coinQuantity={600}
            cost={120}
          />
          <Plan
            name="Ouro"
            coins="1000 moedas"
            price="R$ 150,00"
            benefits={[
              "Receba até 4 orçamentos",
              "Acesso ao painel administrativo",
              "Acesso a loja de pedidos",
              "Suporte especializado 24/7",
              "Bônus por avaliações",
              "Acesso ao clube Profise*",
            ]}
            recommended={false}
            coinQuantity={1000}
            cost={150}
          />
        </div>

        <span className="buy-coins__container__tip">
          * Clube Profise ajuda os profissionais a melhorar sua imagem e a se profissionalizar,
          direcionando cursos de parceiros com desconto.
        </span>
      </div>
    </div>
  );
}

export default DashboardBuyCoins;
