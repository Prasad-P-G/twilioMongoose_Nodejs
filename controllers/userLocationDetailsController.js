const moment = require("moment");
const userLocationModel = require("../models/userlocation");

const userLocationDetailsController = async (req, res) => {
  try {
    console.log("user location :", req.body.location);
    const locationPayLoad = {
      ...req.body,
      dateAndTime: moment(new Date()).format("LLLL"),
    };

    const userlocationData = new userLocationModel(locationPayLoad);

    const responseData = await userlocationData.save();

    console.log("current location data: ", locationPayLoad);

    console.log("current user location response:", responseData);

    return res.status(200).json({
      message: userlocationData,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log("Location erro:", err);
    return res.status(400).json({
      error: err.message,
      message: "location error",
      success: false,
    });
  }
};

module.exports = userLocationDetailsController;
