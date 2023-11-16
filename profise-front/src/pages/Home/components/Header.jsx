/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Context from "../../../Context";

import image from "../../../assets";
import useHeaderStore from "../../../stores/useHeaderStore";
import useAccountStore from "../../../stores/useAccountStore";

function Header() {
  const {
    isMenuClicked,
    openMenu,
    closeMenu,
    openLoginMenu,
    isUserMenuOpen,
    openUserMenu,
    closeUserMenu,
  } = useHeaderStore((state) => ({
    isMenuClicked: state.isMenuClicked,
    openMenu: state.openMenu,
    closeMenu: state.closeMenu,
    openLoginMenu: state.openLoginMenu,
    isUserMenuOpen: state.isUserMenuOpen,
    openUserMenu: state.openUserMenu,
    closeUserMenu: state.closeUserMenu,
  }));
  const { isUserLogged, userNotLogged, user, setUser } = useAccountStore(
    (state) => ({
      isUserLogged: state.isUserLogged,
      userNotLogged: state.userNotLogged,
      user: state.user,
      setUser: state.setUser,
    })
  );

  const { howItWorksRef } = useContext(Context);

  const [scrollPos, setScrollPos] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const btnRef = useRef(null);
  const userMenuBtnRef = useRef(null);
  const aboutBtn = useRef(null);
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  function handleScroll() {
    const position = window.scrollY;
    setScrollPos(position);
  }

  function handleMenu() {
    btnRef.current.style.pointerEvents = "none";

    if (isMenuClicked) {
      closeMenu();
      removeClickOutsideListener();
    } else {
      openMenu();
      addClickOutsideListener();
    }

    setTimeout(() => {
      btnRef.current.style.pointerEvents = "unset";
    }, 400);
  }

  function addClickOutsideListener() {
    document.addEventListener("click", handleClickOutside);
  }

  function removeClickOutsideListener() {
    document.removeEventListener("click", handleClickOutside);
  }

  function handleClickOutside(event) {
    if (!isUserLogged) {
      if (!btnRef.current?.contains(event.target)) {
        closeMenu();
        removeClickOutsideListener();
      }
    }

    if (isUserLogged) {
      if (!userMenuBtnRef.current?.contains(event.target)) {
        closeUserMenu();
        removeClickOutsideListener();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isUserLogged) {
      if (location.pathname.includes("/pedido") && scrollPos === 0) {
        headerRef.current.style.backgroundColor = "#fff";
      }

      return;
    }

    if (
      (location.pathname === "/cadastro-profissional" ||
        location.pathname === "/completar-cadastro-profissional") &&
      scrollPos === 0
    ) {
      aboutBtn.current.style.color = "#FFF";
    } else {
      aboutBtn.current.style.color = "#202124";
    }

    if (location.pathname.includes("/pedido") && scrollPos === 0) {
      headerRef.current.style.backgroundColor = "#fff";
    }
  }, [location, scrollPos, isUserLogged]);

  useEffect(() => {
    let url = "";

    if (user.profileImage) {
      if (
        JSON.stringify(import.meta.env.MODE) === JSON.stringify("development")
      ) {
        url = `${import.meta.env.VITE_API_KEY_DEV}${
          import.meta.env.VITE_API_PORT
        }/profile-image/${user.profileImage}`;
      } else {
        url = `${import.meta.env.VITE_API_KEY}/profile-image/${
          user.profileImage
        }`;
      }
    } else {
      url = null;
    }

    setProfileImageUrl(url);
  }, [user, setProfileImageUrl]);

  function scrollToAbout() {
    howItWorksRef.current.scrollIntoView();
  }

  function openLoginModal() {
    openLoginMenu();
  }

  function redirectToRegister() {
    navigate("/cadastro-profissional");
  }

  function redirectToHome() {
    navigate("/");
  }

  function handleUserMenu() {
    if (isUserMenuOpen) {
      closeUserMenu();
      removeClickOutsideListener();
      return;
    }

    openUserMenu();
    addClickOutsideListener();
  }

  function handleLogout() {
    userNotLogged();
    setUser({});

    localStorage.removeItem("userToken");
  }

  function handleLogoutKeyboard(e) {
    if (e.key === "Enter") {
      handleLogout();
    }
  }

  return (
    <header
      ref={headerRef}
      className={scrollPos === 0 ? "header" : "header scrolled"}
    >
      <div className="header__container wrapper">
        <div
          role="navigation"
          onClick={redirectToHome}
          className="header__container__logo"
        >
          <img src={image.logo} alt="Profise" className="logo" />
        </div>

        {isUserLogged ? (
          <div
            onClick={handleUserMenu}
            ref={userMenuBtnRef}
            role="button"
            tabIndex={0}
            className="header__container__user-box"
          >
            <div className="header__container__user-box__image-box">
              <img
                src={profileImageUrl || image.userPhoto}
                alt="Imagem do Usuário"
                className="header__container__user-box__image-box__image"
              />
            </div>

            <button
              type="button"
              className="header__container__user-box__menu-btn"
            >
              <span
                className={
                  isUserMenuOpen ? "nav-btn-icon close" : "nav-btn-icon"
                }
              />
            </button>

            <span className="header__container__user-box__label">
              Minha Conta{" "}
              <i
                className="fa-solid fa-chevron-down header__container__user-box__label__icon"
                style={
                  isUserMenuOpen
                    ? { transform: "rotateX(180deg)" }
                    : { transform: "rotateX(0deg)" }
                }
              />
            </span>

            <nav
              className={
                isUserMenuOpen
                  ? "header__container__user-box__nav-menu"
                  : "header__container__user-box__nav-menu menu-desactivated"
              }
            >
              <ul className="header__container__user-box__nav-menu__menu-list">
                <li className="header__container__user-box__nav-menu__menu-list__menu-item">
                  <Link
                    to="/painel-de-controle/geral"
                    className={
                      location.pathname === "/painel-de-controle/geral"
                        ? "header__container__user-box__nav-menu__menu-list__menu-item__menu-link item-selected"
                        : "header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                    }
                  >
                    Dados Gerais
                  </Link>
                </li>
                <li className="header__container__user-box__nav-menu__menu-list__menu-item">
                  <Link
                    to="/painel-de-controle/perfil"
                    className={
                      location.pathname === "/painel-de-controle/perfil"
                        ? "header__container__user-box__nav-menu__menu-list__menu-item__menu-link item-selected"
                        : "header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                    }
                  >
                    Perfil
                  </Link>
                </li>
                <li className="header__container__user-box__nav-menu__menu-list__menu-item">
                  <Link
                    to="/painel-de-controle/pedidos-comprados"
                    className={
                      location.pathname ===
                      "/painel-de-controle/pedidos-comprados"
                        ? "header__container__user-box__nav-menu__menu-list__menu-item__menu-link item-selected"
                        : "header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                    }
                  >
                    Pedidos Comprados
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/painel-de-controle/novos-pedidos"
                      ? "header__container__user-box__nav-menu__menu-list__menu-item item-selected"
                      : "header__container__user-box__nav-menu__menu-list__menu-item"
                  }
                >
                  <Link
                    to="/painel-de-controle/novos-pedidos"
                    className={
                      location.pathname === "/painel-de-controle/novos-pedidos"
                        ? "header__container__user-box__nav-menu__menu-list__menu-item__menu-link item-selected"
                        : "header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                    }
                  >
                    Novos Pedidos
                  </Link>
                </li>
                <li className="header__container__user-box__nav-menu__menu-list__menu-item">
                  <Link
                    to="/painel-de-controle/compra-de-moedas"
                    className={
                      location.pathname ===
                        "/painel-de-controle/compra-de-moedas" ||
                      location.pathname === "/resumo-da-compra"
                        ? "header__container__user-box__nav-menu__menu-list__menu-item__menu-link item-selected"
                        : "header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                    }
                  >
                    Compra De Moedas
                  </Link>
                </li>
                <li className="header__container__user-box__nav-menu__menu-list__menu-item">
                  <Link
                    to="/painel-de-controle/alterar-senha"
                    className={
                      location.pathname === "/painel-de-controle/alterar-senha"
                        ? "header__container__user-box__nav-menu__menu-list__menu-item__menu-link item-selected"
                        : "header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                    }
                  >
                    Alterar Senha
                  </Link>
                </li>
                <li className="header__container__user-box__nav-menu__menu-list__menu-item">
                  <Link
                    to="/"
                    onClick={handleLogout}
                    onKeyDown={handleLogoutKeyboard}
                    className="header__container__user-box__nav-menu__menu-list__menu-item__menu-link"
                  >
                    Deslogar
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <nav className="nav-menu-container">
            <button
              type="button"
              onClick={openLoginModal}
              className="nav-login-register-btn"
            >
              Login / Registrar
            </button>

            <button
              type="button"
              className="nav-btn"
              ref={btnRef}
              onClick={handleMenu}
            >
              <span
                className={
                  isMenuClicked ? "nav-btn-icon close" : "nav-btn-icon"
                }
              />
            </button>

            <span
              role="navigation"
              onClick={scrollToAbout}
              className="nav-menu-about"
              ref={aboutBtn}
            >
              Como funciona
            </span>

            <button
              type="button"
              className="nav-pro-btn"
              onClick={redirectToRegister}
            >
              Seja um profissional
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
