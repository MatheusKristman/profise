import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";
import api from "./services/api";

(async () => {
  const { publishableKey } = await api
    .get("/payment/config")
    .then((res) => res.data)
    .catch((error) => console.error(error));

  const stripePromise = loadStripe(publishableKey);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <ToastContainer />
        <App />
      </Elements>
    </React.StrictMode>
  );
})();
