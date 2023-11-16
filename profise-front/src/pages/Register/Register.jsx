import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  Footer,
  Header,
  LoginModal,
  HeaderMobileMenu,
  About,
  Testimonials,
} from "../Home/components";
import { RegisterContent, RegisterSMSToken } from "./components";
import useRegisterStore from "../../stores/useRegisterStore";
import useHeaderStore from "../../stores/useHeaderStore";

function Register() {
  const { isSMSTokenOpen } = useRegisterStore((state) => ({
    isSMSTokenOpen: state.isSMSTokenOpen,
  }));
  const { isLoginMenuOpen } = useHeaderStore((state) => ({
    isLoginMenuOpen: state.isLoginMenuOpen,
  }));

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <>
      <HeaderMobileMenu />
      {isLoginMenuOpen && <LoginModal />}
      <Header />
      <RegisterContent />
      {isSMSTokenOpen && <RegisterSMSToken />}
      <About />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Register;
