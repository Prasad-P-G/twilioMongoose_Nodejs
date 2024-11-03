const userDetailsModel = require("../models/user");
const twilio = require("twilio");
//require("dotenv").config();
const twilioModel = require("../models/twiliokeys");

//require("dotenv").config({ path: "./vars/.env" });

var TWILIO_ACC_SID = "null";
var TWILIO_AUTH_ID = "null";
var TWILIO_PHONE_NUMBER = "null";
var Admin_phone = "null";

const userContactDetailsController = async (req, res) => {
  try {
    const twilioAccout = await twilioModel.find();
    if (twilioAccout) {
      console.log("twilio info", twilioAccout);
      console.log("length is ", twilioAccout.length);
    } else {
      console.log("no data for twilio");
    }

    if (twilioAccout.length == 1) {
      TWILIO_ACC_SID = twilioAccout[0].sid;
      TWILIO_AUTH_ID = twilioAccout[0].auth_id;
      TWILIO_PHONE_NUMBER = twilioAccout[0].twilioPhone;
      Admin_phone = twilioAccout[0].admin_phone;
    }

    const twilioClient = new twilio(TWILIO_ACC_SID, TWILIO_AUTH_ID);

    const { name, email, phoneNumber, desc } = req.body;

    //console.log("The user query is :", desc);

    //console.log("UI Data", req.body);

    //save user details into mongoose db
    const userDetails = new userDetailsModel({ ...req.body, date: new Date() });
    const SavedUserDetails = await userDetails.save();

    console.log("User Details in Node server:", userDetails);

    if (SavedUserDetails) {
      const result = await twilioClient.messages.create({
        body: `Message has recieved from ${name} - ${email} with description : ${desc} and user phone number is ${phoneNumber}`,
        to: Admin_phone,
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
