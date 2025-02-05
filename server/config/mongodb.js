// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);

//     mongoose.connection.on("connected", () => {
//       console.log("MongoDB Connected Successfully!");
//     });

//     mongoose.connection.on("error", (err) => {
//       console.error("MongoDB Connection Error:", err);
//       process.exit(1);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");

    if (!process.env.MONGODB_URL) {
      throw new Error("❌ MONGODB_URL is not defined in the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout if MongoDB is unreachable
    });

    console.log("✅ MongoDB Connected Successfully!");

    mongoose.connection.on("connected", () => {
      console.log(" Mongoose Event: Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error(" Mongoose Connection Error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
