import React from "react";
import { shallow } from "zustand/shallow";

import {
  Footer,
  Header,
  LoginModal,
  HeaderMobileMenu,
} from "../Home/components";
import CompleteRegisterContent from "./components/CompleteRegisterContent";
import useHeaderStore from "../../stores/useHeaderStore";
import useGeneralStore from "../../stores/useGeneralStore";
import LoadingCategories from "../Order/components/LoadingCategories";

function CompleteRegister() {
  const { isLoginMenuOpen } = useHeaderStore((state) => ({
    isLoginMenuOpen: state.isLoginMenuOpen,
  }));
  const { isFetching } = useGeneralStore(
    (state) => ({
      isFetching: state.isFetching,
    }),
    shallow
  );

  return (
    <>
      <HeaderMobileMenu />
      {isLoginMenuOpen && <LoginModal />}
      <Header />
      {isFetching && <LoadingCategories />}
      <CompleteRegisterContent />
      <Footer />
    </>
  );
}

export default CompleteRegister;
