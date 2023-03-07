require("dotenv").config();
const mongoose = require("mongoose");

const { DATABASE_URL } = process.env;

mongoose.connect = mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .on("open", () => console.log("Open"))
  .on("close", () => console.log("Close"))
  .on("error", (error) => console.log(error));

module.exports = mongoose;
