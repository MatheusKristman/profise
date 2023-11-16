import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Header,
  HeaderMobileMenu,
  Footer,
  LoginModal,
} from "../Home/components";
import ChangePasswordSuccessContent from "./components/ChangePasswordSuccessContent";
import useAccountStore from "../../stores/useAccountStore";
import useIsUserLogged from "../../hooks/useIsUserLogged";
import useHeaderStore from "../../stores/useHeaderStore";

const ChangePasswordSuccess = () => {
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
      <ChangePasswordSuccessContent />
      <Footer />
    </>
  );
};

export default ChangePasswordSuccess;
