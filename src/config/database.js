const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(" Mongo URI:", process.env.DB_CONNECTION); 
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
  }
};

module.exports = connectDB;
