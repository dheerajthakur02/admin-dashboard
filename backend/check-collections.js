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
    const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/admin-dashboard";
    await mongoose.connect(mongoUrl);
    console.log("Database Connected Successfully to:", mongoUrl);
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
    
    console.log("\n=== All Collections and Document Counts ===");
    
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`${collection.name}: ${count} documents`);
      
      // If it's a college-related collection, show a sample document
      if (collection.name.toLowerCase().includes('college')) {
        const sample = await db.collection(collection.name).findOne();
        if (sample) {
          console.log(`  Sample document from ${collection.name}:`, JSON.stringify(sample, null, 2));
        }
      }
    }
    
    console.log("\n=== Checking College Model ===");
    try {
      const College = mongoose.model("College");
      console.log("College model exists");
      console.log("College collection name:", College.collection.name);
      
      const colleges = await College.find().limit(5);
      console.log(`Found ${colleges.length} colleges in College model`);
      
      if (colleges.length > 0) {
        console.log("Sample college:", JSON.stringify(colleges[0], null, 2));
      }
    } catch (error) {
      console.log("Error with College model:", error.message);
    }
    
  } catch (error) {
    console.error("Error checking collections:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
}

checkCollections();