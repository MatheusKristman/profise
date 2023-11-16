import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

import { Header, Footer } from "../Home/components";
import { OrderSuccessContent } from "./components";

function OrderSuccess() {
  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <>
      <Header />
      <OrderSuccessContent />
      <Footer />
    </>
  );
}

export default OrderSuccess;
