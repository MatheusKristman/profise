import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Header,
  HeaderMobileMenu,
  Footer,
  LoginModal,
} from "../Home/components";
import PasswordRecoveryContent from "./components/PasswordRecoveryContent";
import useIsUserLogged from "../../hooks/useIsUserLogged";
import useAccountStore from "../../stores/useAccountStore";
import useHeaderStore from "../../stores/useHeaderStore";

import "../../css/PasswordRecovery/password-recovery.css";

const PasswordRecovery = () => {
  useIsUserLogged();

  const { isUserLogged } = useAccountStore();
  const { isLoginMenuOpen } = useHeaderStore();

  const Navigate = useNavigate();

  if (isUserLogged) {
    Navigate("/");
  }

  return (
    <>
      <Header />
      <HeaderMobileMenu />
      {isLoginMenuOpen && <LoginModal />}
      <PasswordRecoveryContent />
      <Footer />
    </>
  );
};

export default PasswordRecovery;
