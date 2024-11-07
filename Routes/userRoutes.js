require("dotenv").config();
//require(dotenv.config({ path: "./vars/.env" }));
//require("dotenv").config({ path: "./vars/.env" });
const express = require("express");
const userMobileOTPController = require("../controllers/userMobileOTPController");
const verifyOTPController = require("../controllers/verifyOTPController");
const userContactDetailsController = require("../controllers/userContactDetailsController");
const userLocationDetailsController = require("../controllers/userLocationDetailsController");

const router = express();

router.use(express.json());

router.post("/send-otp", userMobileOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("/userContactDetails", userContactDetailsController);
router.post("/userLocationDetails", userLocationDetailsController);
module.exports = router;
