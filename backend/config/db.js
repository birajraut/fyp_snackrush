const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;

// const connect = async () => {
//   try {
//     await mongoose.connect(uri, {
//       serverSelectionTimeoutMS: 30000,  // 30 seconds timeout to connect to MongoDB server
//     });

//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//   }
// };
const connect = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,  // 30 seconds timeout to connect to MongoDB server
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);  // Exit the process if MongoDB connection fails
  }
};


module.exports = { connect };

