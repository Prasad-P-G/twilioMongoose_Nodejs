//const { otpVerification } = require("../Helpers/otpValidation");
const otpVerification = require("../Helpers/otpValidation");
const otpModel = require("../models/otp");

const verifyOTPController = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    const result = await otpModel.findOne({
      phoneNumber,
      otp,
    });

    console.log("result is :=>", result);

    if (!result) {
      return res.status(400).json({
        message: "You have Entered wrong OTP",
        success: false,
      });
    }

    const verificationStatus = otpVerification(result.otpExpiration);

    console.log("The status is :=>", verificationStatus);
    if (verificationStatus) {
      return res.status(400).json({
        message: "Your OTP has been expired",
        success: false,
      });
    }
    return res.status(200).json({
      message: "OTP Verified successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      message: "Invalid OTP!!!",
      success: false,
    });
  }
};

module.exports = verifyOTPController;
