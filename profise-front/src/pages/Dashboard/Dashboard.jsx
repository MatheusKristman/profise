import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import { Header } from "../Home/components";
import DashboardContent from "./components/DashboardContent";
import useIsUserLogged from "../../hooks/useIsUserLogged";

function Dashboard() {
  const { menu } = useParams();

  useIsUserLogged();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <>
      <Header />
      <DashboardContent menu={menu} />
    </>
  );
}

export default Dashboard;
