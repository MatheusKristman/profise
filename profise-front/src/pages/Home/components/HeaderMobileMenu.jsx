import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import contact from "../../../constants/HeaderFooter";
import useHeaderStore from "../../../stores/useHeaderStore";

function HeaderMobileMenu() {
  const {
    isMenuShowed,
    showMenu,
    dontShowMenu,
    isMenuClicked,
    closeMenu,
    openLoginMenu,
  } = useHeaderStore((state) => ({
    isMenuShowed: state.isMenuShowed,
    showMenu: state.showMenu,
    dontShowMenu: state.dontShowMenu,
    isMenuClicked: state.isMenuClicked,
    closeMenu: state.closeMenu,
    openLoginMenu: state.openLoginMenu,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isMenuClicked) {
      setTimeout(() => {
        dontShowMenu();
      }, 400);
    } else {
      showMenu();
    }
  }, [isMenuClicked, showMenu, dontShowMenu]);

  const navigateToProfessionalRegister = () => {
    closeMenu();
    navigate("/cadastro-profissional");
  };

  const scrollToPublish = () => {
    closeMenu();

    setTimeout(() => {
      scroll.scrollToTop();
    }, 400);
  };

  const openLoginModal = () => {
    closeMenu();

    setTimeout(() => {
      openLoginMenu();
    }, 400);
  };

  return (
    isMenuShowed && (
      <nav
        className={
          isMenuClicked
            ? "header-mobile-menu"
            : "header-mobile-menu menu-desactive"
        }
      >
        <div className="header-mobile-menu__container">
          <div className="header-mobile-menu__container__head">
            <h6 className="header-mobile-menu__container__head__title">Menu</h6>
          </div>

          <div className="header-mobile-menu__container__items wrapper">
            <div className="header-mobile-menu__container__items__links">
              <button
                type="button"
                onClick={openLoginModal}
                className="header-mobile-login-register-btn"
              >
                Login / Registrar
              </button>

              <button
                type="button"
                onClick={scrollToPublish}
                className="header-mobile-demand-btn"
              >
                Publicar Demanda
              </button>

              <button
                type="button"
                onClick={navigateToProfessionalRegister}
                className="header-mobile-pro-btn"
              >
                Seja um Profissional
              </button>
            </div>

            <div className="header-mobile-menu__container__items__infos">
              <h4 className="header-mobile-menu-title">
                Whatsapp <i className="fa-brands fa-whatsapp" />
              </h4>

              <a href="#" className="header-mobile-menu-tel">
                {contact.tel}
              </a>

              <span className="header-mobile-menu-address">
                {contact.address}
              </span>

              <span className="header-mobile-menu-address">{contact.city}</span>

              <span className="header-mobile-menu-email">{contact.email}</span>

              <ul className="header-mobile-menu-social-links">
                <li className="header-mobile-menu-social-links__link">
                  <a className="facebook" href="#">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
                <li className="header-mobile-menu-social-links__link">
                  <a className="twitter" href="#">
                    <i className="fa-brands fa-twitter" />
                  </a>
                </li>
                <li className="header-mobile-menu-social-links__link">
                  <a className="instagram" href="#">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li className="header-mobile-menu-social-links__link">
                  <a className="linkedin" href="#">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  );
}

export default HeaderMobileMenu;
