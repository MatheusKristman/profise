import React, { useMemo, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import RegisterModal from "./pages/Register/Register";
import CompleteRegister from "./pages/CompleteRegister/CompleteRegister";
import Order from "./pages/Order/Order";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Dashboard from "./pages/Dashboard/Dashboard";
import Checkout from "./pages/Payment/Checkout";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Review from "./pages/Review/Review";
import ReviewSuccess from "./pages/ReviewSuccess/ReviewSuccess";
import Context from "./Context";
import useHeaderStore from "./stores/useHeaderStore";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ChangePasswordSuccess from "./pages/ChangePasswordSuccess/ChangePasswordSuccess";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";

import "./css/styles.css";

function App() {
  const { closeLoginMenu, isMenuClicked, isLoginMenuOpen } = useHeaderStore((state) => ({
    closeLoginMenu: state.closeLoginMenu,
    isMenuClicked: state.isMenuClicked,
    isLoginMenuOpen: state.isLoginMenuOpen,
  }));

  const howItWorksRef = useRef(null);
  const loginModalRef = useRef(null);

  const contextValue = useMemo(
    () => ({
      howItWorksRef,
      loginModalRef,
    }),
    []
  );

  useEffect(() => {
    function resetLoginModal() {
      closeLoginMenu();
    }

    resetLoginModal();
  }, [closeLoginMenu]);

  useEffect(() => {
    function lockMenuScreen() {
      if (isMenuClicked) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "unset";
      }
    }

    lockMenuScreen();
  }, [isMenuClicked]);

  useEffect(() => {
    function lockLoginScreen() {
      if (isLoginMenuOpen) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "unset";
      }
    }

    lockLoginScreen();
  }, [isLoginMenuOpen]);

  return (
    <Router>
      <Context.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-profissional" element={<RegisterModal />} />
          <Route path="/completar-cadastro-profissional" element={<CompleteRegister />} />
          <Route path="/pedido/:slug" element={<Order />} />
          <Route path="/pedido-concluido" element={<OrderSuccess />} />
          <Route path="/painel-de-controle/:menu" element={<Dashboard />} />
          <Route path="/resumo-da-compra" element={<Checkout />} />
          <Route path="/pagamento-confirmado" element={<PaymentSuccess />} />
          <Route path="/avaliacao-do-profissional" element={<Review />} />
          <Route path="/avaliacao-enviada" element={<ReviewSuccess />} />
          <Route path="/esqueci-a-senha" element={<ChangePassword />} />
          <Route path="/esqueci-a-senha/email-enviado" element={<ChangePasswordSuccess />} />
          <Route path="/recuperacao-de-senha" element={<PasswordRecovery />} />
        </Routes>
      </Context.Provider>
    </Router>
  );
}

export default App;
