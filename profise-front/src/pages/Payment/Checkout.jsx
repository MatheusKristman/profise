import React from "react";
import { Header, HeaderMobileMenu, Footer } from "../Home/components";
import CheckoutContent from "./components/CheckoutContent";
import useIsUserLogged from "../../hooks/useIsUserLogged";

export default function Checkout() {
  useIsUserLogged();

  return (
    <>
      <Header />
      <HeaderMobileMenu />
      <CheckoutContent />
      <Footer />
    </>
  );
}
