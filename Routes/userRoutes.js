require("dotenv").config();

const express = require("express");
const userMobileOTPController = require("../controllers/userMobileOTPController");
const verifyOTPController = require("../controllers/verifyOTPController");
const userContactDetailsController = require("../controllers/userContactDetailsController");

const router = express();

router.use(express.json());

router.post("/send-otp", userMobileOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("/userContactDetails", userContactDetailsController);
module.exports = router;
