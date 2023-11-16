/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

import useAccountStore from "../stores/useAccountStore";

function useIsUserLogged() {
  const { setUser, userLogged, userNotLogged } = useAccountStore((state) => ({
    setUser: state.setUser,
    userLogged: state.userLogged,
    userNotLogged: state.userNotLogged,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || null;

    console.log(token);

    if (token) {
      api
        .get("/professional/user-confirmation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser({ ...res.data });
          userLogged();
        })
        .catch((error) => {
          console.error(error);
          userNotLogged();
          localStorage.removeItem("userToken");

          if (location.pathname === "/completar-cadastro-profissional") {
            navigate("/");
          }
        });
    }
  }, [location.pathname, navigate, setUser, userLogged, userNotLogged]);
}

export default useIsUserLogged;
