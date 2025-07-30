import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/admin-dashboard";

    await mongoose.connect(mongoUrl);
    console.log("Database Connected Successfully to:", mongoUrl);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit if database connection fails
  }
};
