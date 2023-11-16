const express = require("express");
const router = express.Router();
const { login, requestOrder } = require("../controllers/userController.js");
const { verifyOTP } = require("../controllers/twilioController.js");

router.post("/login", login);
router.post("/request-order", verifyOTP, requestOrder);

module.exports = router;
