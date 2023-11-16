import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Header,
  HeaderMobileMenu,
  Footer,
  LoginModal,
} from "../Home/components";
import ChangePasswordContent from "./components/ChangePasswordContent";
import useAccountStore from "../../stores/useAccountStore";
import useIsUserLogged from "../../hooks/useIsUserLogged";

import "../../css/ChangePassword/change-password.css";
import useHeaderStore from "../../stores/useHeaderStore";

const ChangePassword = () => {
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
      <ChangePasswordContent />
      <Footer />
    </>
  );
};

export default ChangePassword;
