import React from "react";
import contact from "../../../constants/HeaderFooter";
import { Link } from "react-router-dom";

import images from "../../../assets";
import useAccountStore from "../../../stores/useAccountStore";

function Footer() {
  const { isUserLogged } = useAccountStore();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container__up">
          <div className="footer__container__up__box wrapper">
            <div className="footer__container__up__box__logo-contact-box">
              <div className="footer-logo-box">
                <img
                  src={images.logo}
                  alt="Profise"
                  className="footer-logo-box__image"
                />
              </div>

              <div className="footer-contact-info">
                <h4 className="footer-contact-info__contact">
                  Whatsapp <i className="fa-brands fa-whatsapp" />
                </h4>

                <a href="#" className="footer-contact-info__tel">
                  {contact.tel}
                </a>

                <span className="footer-contact-info__address">
                  {contact.address}
                </span>

                <span className="footer-contact-info__address">
                  {contact.city}
                </span>

                <span className="footer-contact-info__email">
                  {contact.email}
                </span>
              </div>
            </div>

            <div className="footer__container__up__box__footer-links-container">
              <div className="footer-links-box">
                <h4 className="footer-links-box__title">Anunciantes</h4>

                <ul className="footer-links-box__list">
                  <li className="footer-links-box__list__item">
                    <a href="#" className="footer-links-box__list__item__link">
                      Anuncie
                    </a>
                  </li>
                  <li className="footer-links-box__list__item">
                    <a
                      href="#sobre"
                      className="footer-links-box__list__item__link"
                    >
                      Como funciona
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-box">
                <h4 className="footer-links-box__title">Profissionais</h4>

                <ul className="footer-links-box__list">
                  {isUserLogged ? (
                    <li className="footer-links-box__list__item">
                      <Link
                        to="/painel-de-controle/geral"
                        className="footer-links-box__list__item__link"
                      >
                        Painel administrativo
                      </Link>
                    </li>
                  ) : (
                    <li className="footer-links-box__list__item">
                      <Link
                        to="/cadastro-profissional"
                        className="footer-links-box__list__item__link"
                      >
                        Seja um profissional
                      </Link>
                    </li>
                  )}

                  <li className="footer-links-box__list__item">
                    <a
                      href="#sobre"
                      className="footer-links-box__list__item__link"
                    >
                      Como funciona
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-box">
                <h4 className="footer-links-box__title">Sobre nós</h4>

                <ul className="footer-links-box__list">
                  <li className="footer-links-box__list__item">
                    <a
                      href="#beneficios"
                      className="footer-links-box__list__item__link"
                    >
                      O que fazemos
                    </a>
                  </li>
                  <li className="footer-links-box__list__item">
                    <a href="#" className="footer-links-box__list__item__link">
                      Blog
                    </a>
                  </li>
                  <li className="footer-links-box__list__item">
                    <a href="#" className="footer-links-box__list__item__link">
                      Contato
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__container__down">
          <div className="footer__container__down__box wrapper">
            <div className="footer-copyright-box">
              <span className="footer-copyright-box__text">
                © 2022 Profise. Todos os direitos reservados.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
