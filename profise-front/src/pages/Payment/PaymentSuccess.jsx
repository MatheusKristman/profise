import React from "react";

import { Header, Footer, HeaderMobileMenu } from "../Home/components";
import PaymentSuccessContent from "./components/PaymentSuccessContent";

export default function PaymentSuccess() {
  return (
    <>
      <Header />
      <HeaderMobileMenu />
      <PaymentSuccessContent />
      <Footer />
    </>
  );
}
