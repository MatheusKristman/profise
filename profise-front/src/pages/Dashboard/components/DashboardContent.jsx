/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  DashboardGeneral,
  DashboardProfile,
  DashboardBuyedOrders,
  DashboardNewOrders,
  DashboardBuyCoins,
  DashboardChangePassword,
} from "./index";
import useAccountStore from "../../../stores/useAccountStore";

import "../../../css/Dashboard/styles-dashboard.css";

function DashboardContent({ menu }) {
  const { setUser, userNotLogged } = useAccountStore();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    userNotLogged();
    setUser({});

    localStorage.removeItem("userToken");
    navigate("/");
  };

  const handleLogoutKeyboard = (e) => {
    if (e.key === "Enter") {
      handleLogout();
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__container__menu">
          <div className="dashboard__container__menu__menu-container">
            <nav className="dashboard__container__menu__menu-container__menu-nav">
              <ul className="dashboard__container__menu__menu-container__menu-nav__menu-list">
                <li
                  className={
                    location.pathname === "/painel-de-controle/geral"
                      ? "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item menu-item-selected"
                      : "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/geral"
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-solid fa-house" />
                    Dados Gerais
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/painel-de-controle/perfil"
                      ? "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item menu-item-selected"
                      : "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/perfil"
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-solid fa-user" />
                    Perfil
                  </Link>
                </li>
                <li
                  className={
                    location.pathname ===
                    "/painel-de-controle/pedidos-comprados"
                      ? "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item menu-item-selected"
                      : "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/pedidos-comprados"
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-solid fa-briefcase" />
                    Pedidos Comprados
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/painel-de-controle/novos-pedidos"
                      ? "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item menu-item-selected"
                      : "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/novos-pedidos"
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-regular fa-bell" />
                    Novos Pedidos
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/painel-de-controle/compra-de-moedas"
                      ? "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item menu-item-selected"
                      : "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/compra-de-moedas"
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-solid fa-box-archive" />
                    Compra De Moedas
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/painel-de-controle/alterar-senha"
                      ? "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item menu-item-selected"
                      : "dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/alterar-senha"
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-solid fa-lock" />
                    Alterar Senha
                  </Link>
                </li>
                <li
                  role="button"
                  className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item"
                >
                  <Link
                    to="/"
                    onClick={handleLogout}
                    onKeyDown={handleLogoutKeyboard}
                    className="dashboard__container__menu__menu-container__menu-nav__menu-list__menu-item__menu-link"
                  >
                    <i className="fa-solid fa-right-from-bracket" />
                    Deslogar
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="dashboard__container__content">
          {menu === "geral" && <DashboardGeneral />}
          {menu === "perfil" && <DashboardProfile />}
          {menu === "pedidos-comprados" && <DashboardBuyedOrders />}
          {menu === "novos-pedidos" && <DashboardNewOrders />}
          {menu === "compra-de-moedas" && <DashboardBuyCoins />}
          {menu === "alterar-senha" && <DashboardChangePassword />}
          <span className="dashboard__container__content__copyright">
            © 2022 Profise. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </section>
  );
}

export default DashboardContent;
