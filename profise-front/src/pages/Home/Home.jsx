/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  HeaderMobileMenu,
  LoginModal,
  Header,
  Hero,
  Brands,
  Categories,
  Features,
  About,
  TopPro,
  Testimonials,
  Footer,
} from "./components";
import useHeaderStore from "../../stores/useHeaderStore";
import useIsUserLogged from "../../hooks/useIsUserLogged";

function Home() {
  const { isLoginMenuOpen } = useHeaderStore((state) => ({
    isLoginMenuOpen: state.isLoginMenuOpen,
  }));

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useIsUserLogged();

  return (
    <>
      <Header />
      <HeaderMobileMenu />
      {isLoginMenuOpen && <LoginModal />}
      <Hero />
      <Brands />
      <Categories />
      <Features />
      <About />
      <TopPro />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
