const express = require("express");
const { getOrders, getSelectedOrder } = require("../controllers/orderController.js");

const router = express.Router();

router.post("/get-orders", getOrders);
router.post("/get-selected-order", getSelectedOrder);

module.exports = router;
