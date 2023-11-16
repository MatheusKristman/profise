const express = require("express");
const {
  stripeConfig,
  createCheckoutSession,
  getStripeSession,
} = require("../controllers/paymentController.js");

const router = express.Router();

router.get("/config", stripeConfig);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/get-session", getStripeSession);

module.exports = router;
