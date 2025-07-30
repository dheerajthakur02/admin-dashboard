import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { connectDB } from "./db.js";

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

import countryRoutes from "./Route/country.routes.js";
import commonRoutes from "./Route/common.routes.js";
import streamRoutes from "./Route/stream.route.js";
import degreeRoutes from "./Route/degree.route.js";
import courseRoutes from "./Route/course.route.js";
import courseDurationRoutes from "./Route/course_duration.route.js";
import affilicationRoutes from "./Route/affilication.route.js";
import approvedThroughRoutes from "./Route/approvedThrough.route.js";
import examTypeRoutes from "./Route/examType.route.js";
import rankingRoutes from "./Route/ranking.route.js";
import ownershipRoutes from "./Route/ownership.route.js";
import collegeFacilityRoutes from "./Route/collegeFacility.route.js";
import stateRoutes from "./Route/state.routes.js";
import districtRoutes from "./Route/district.routes.js";
import examLevelRoutes from "./Route/examlevel.routes.js";
import examRoutes from "./Route/exam.routes.js";
import collegeRoutes from "./Route/college.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

app.use("/api/country", countryRoutes);
app.use("/api/", commonRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/degree", degreeRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/course-duration", courseDurationRoutes);
app.use("/api/affilication", affilicationRoutes);
app.use("/api/approved-through", approvedThroughRoutes);
app.use("/api/exam-type", examTypeRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/ownership", ownershipRoutes);
app.use("/api/college-facility", collegeFacilityRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/examlevel", examLevelRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/college", collegeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
