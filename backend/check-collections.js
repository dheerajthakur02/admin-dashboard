// Script to check all collections and their document counts
import mongoose from "mongoose";

// Import all models to ensure they are registered
import "./models/affliciation.model.js";
import "./models/approvesThrough.model.js";
import "./models/College.model.js";
import "./models/collegeFacility.model.js";
import "./models/course.model.js";
import "./models/degree.model.js";
import "./models/district.model.js";
import "./models/Exam.model.js";
import "./models/ExamLevel.model.js";
import "./models/examType.model.js";
import "./models/ownership.model.js";
import "./models/ranking.model.js";
import "./models/state.model.js";
import "./models/stream.model.js";

const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/admin-dashboard";
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

async function checkCollections() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();

      // If it's a college-related collection, show a sample document
      if (collection.name.toLowerCase().includes("college")) {
        const sample = await db.collection(collection.name).findOne();
      }
    }

    try {
      const College = mongoose.model("College");
      const colleges = await College.find().limit(5);
    } catch (error) {
      // Error with College model
    }
  } catch (error) {
    console.error("Error checking collections:", error);
  } finally {
    await mongoose.disconnect();
  }
}

checkCollections();
