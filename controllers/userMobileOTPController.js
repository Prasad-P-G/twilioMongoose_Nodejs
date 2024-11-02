const otpModel = require("../models/otp");
//require("dotenv").config();
require("dotenv").config({ path: "./vars/.env" });
const otpGenerator = require("otp-generator");
const twilio = require("twilio");

const TWILIO_ACC_SID = process.env.TWILIO_ACC_SID;
const TWILIO_AUTH_ID = process.env.TWILIO_AUTH_ID;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = new twilio(TWILIO_ACC_SID, TWILIO_AUTH_ID);

const userMobileOTPController = async (req, res) => {
  console.log("twilio client :", twilioClient);
  try {
    if (!req.body) {
      return res.status(400).json({
        error: err,
        message: "Invalid Phone Number",
        success: false,
      });
    }

    const { phoneNumber } = req.body;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const cDate = new Date();

    await otpModel.findOneAndUpdate(
      { phoneNumber },
      { otp, otpExpiration: new Date(cDate.getTime()) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    //send otp to mobile using twilio client
    // await twilioClient.messages.create({
    //   body: `Your OTP is : ${otp}`,
    //   to: phoneNumber,
    //   FormData: "+916364302933",
    // });
    const result = await twilioClient.messages.create({
      body: "Your otp Generated BY Mr.Prasad Gurlahosur is ::" + otp,
      to: phoneNumber,
      from: TWILIO_PHONE_NUMBER,
    });

    console.log("The result is :", result);
    return res.status(200).json({
      otpData: otp,
      message: "OTP Generated successfully",
      success: true,
    });
  } catch (err) {
    console.log("58-EORR:", err);
    return res.status(400).json({
      error: err,
      message: "Invalid Phone Number",
      success: false,
      twilipn: TWILIO_PHONE_NUMBER,
    });
  }
};

module.exports = userMobileOTPController;
