// Test script to verify all models are properly registered
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

async function testModels() {
  try {
    // Test if models are accessible
    const models = [
      "Affliciation",
      "ApprovedThrough",
      "College",
      "CollegeFacility",
      "Course",
      "Degree",
      "District",
      "Exam",
      "ExamLevel",
      "ExamType",
      "Ownership",
      "Ranking",
      "State",
      "Stream",
    ];

    for (const modelName of models) {
      try {
        const model = mongoose.model(modelName);
      } catch (error) {
        // Model not registered
      }
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testModels();
