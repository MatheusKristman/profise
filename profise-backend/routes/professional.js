const express = require("express");
const {
  getUser,
  changePassword,
  buyContact,
  getBuyedOrders,
  deleteBuyedOrder,
  concludeOrder,
  reviewedProfessional,
  sendReview,
  requestPasswordChange,
  passwordRecovery,
  userAlreadyRegistered,
  getReviewsFromCategory,
} = require("../controllers/professionalController.js");
const { auth } = require("../controllers/authController.js");
const { sendOTP, verifyRegisterOTP } = require("../controllers/twilioController.js");

const router = express.Router();

router.post("/register-verification", userAlreadyRegistered);
router.post("/send-otp", sendOTP);
router.post("/verify-register-otp", verifyRegisterOTP);
router.post("/buy-contact", buyContact);
router.post("/get-buyed-orders", getBuyedOrders);
router.post("/conclude-order", concludeOrder);
router.post("/reviewed-professional", reviewedProfessional);
router.post("/send-review", sendReview);
router.post("/request-password-change", requestPasswordChange);
router.post("/password-recovery", passwordRecovery);
router.put("/delete-buyed-order", deleteBuyedOrder);
router.put("/change-password", changePassword);
router.get("/user-confirmation", auth, getUser);
router.get("/get-reviews-from-category", getReviewsFromCategory);

module.exports = router;
