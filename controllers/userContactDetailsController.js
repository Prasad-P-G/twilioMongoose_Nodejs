const userDetailsModel = require("../models/user");
const twilio = require("twilio");
require("dotenv").config();
//require("dotenv").config({ path: "./vars/.env" });

const TWILIO_ACC_SID = process.env.TWILIO_ACC_SID;
const TWILIO_AUTH_ID = process.env.TWILIO_AUTH_ID;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = new twilio(TWILIO_ACC_SID, TWILIO_AUTH_ID);

const userContactDetailsController = async (req, res) => {
  try {
    const { name, email, phoneNumber, desc } = req.body;

    console.log("UI Data", req.body);

    //save user details into mongoose db
    const userDetails = new userDetailsModel({ ...req.body, date: new Date() });
    const SavedUserDetails = await userDetails.save();

    console.log("User Details in Node server:", userDetails);

    if (SavedUserDetails) {
      const result = await twilioClient.messages.create({
        body: `Message has recieved from ${name} - ${email} with description : ${desc} and user phone number is ${phoneNumber}`,
        to: process.env.ADMIN_PHONE_NUMBER,
        from: TWILIO_PHONE_NUMBER,
      });
    }

    //sending message to admin mobile
    return res.status(200).json({
      data: SavedUserDetails,
      message: "Your inputs Sent to Concerned person Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      message: err.message,
      success: false,
    });
  }
};

module.exports = userContactDetailsController;
