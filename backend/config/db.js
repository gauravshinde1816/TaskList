const mongoose = require("mongoose");
const config = require("config");
const URI = config.get("MONOGO_URI");
const connectDB = async () => {
  try {
    const res = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
