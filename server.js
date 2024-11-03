//require("dotenv").config();
//require("dotenv").config({ path: "./vars/.env" });
const cors = require("cors");

const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(
  "mongodb+srv://guru1982test:bo%401982@bo-backend.eljni.mongodb.net/UserPhoneOTPDb?retryWrites=true&w=majority&appName=BO-Backend"
);

//console.log(process.env.MONGODB_URI);

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRoute = require("./Routes/userRoutes");

app.use("/api", userRoute);

//listener
app.listen(PORT, (req, res) => {
  console.log("Express server started on port :", PORT);
});
