import React, { useEffect, useState } from "react";
import {
  Header,
  Footer,
  About,
  HeaderMobileMenu,
  LoginModal,
} from "../Home/components";
import { OrderContent, Reviews, LoadingCategories } from "./components";
import { animateScroll as scroll } from "react-scroll";

import "../../css/styles.css";
import useOrderStore from "../../stores/useOrderStore";
import useIsUserLogged from "../../hooks/useIsUserLogged";
import SMSToken from "./components/SMSToken";
import useHeaderStore from "../../stores/useHeaderStore";

function Order() {
  const { isLoading, isSMSTokenOpen } = useOrderStore();
  const { isLoginMenuOpen } = useHeaderStore();
  const [isLoadingAnimationActive, setIsLoadingAnimationActive] =
    useState(false);

  useIsUserLogged();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isLoading]);

  return (
    <>
      <Header />
      <HeaderMobileMenu />
      {isLoginMenuOpen && <LoginModal />}
      <OrderContent setIsLoadingAnimationActive={setIsLoadingAnimationActive} />
      <About />
      <Reviews />
      <Footer />
      {isSMSTokenOpen && <SMSToken />}
      {isLoading && (
        <LoadingCategories
          isLoadingAnimationActive={isLoadingAnimationActive}
        />
      )}
    </>
  );
}

export default Order;
