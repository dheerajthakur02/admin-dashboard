import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    popularName: { type: String },
    shortName: { type: String },
    establishedYear: { type: String },
    campusSize: { type: String },
    typeMode: { type: String, required: true },
    address: {
      line1: { type: String },
      line2: { type: String },
      pincode: { type: String },
    },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: false,
    },
    collegeShortDescription: { type: String },
    collegeLongDescription: { type: String },
    collegeLogo: { type: String },
    collegeBanner: { type: String },
    collegeBrochure: { type: String },
    collegeGallery: [{ type: String }],
    collegeVideo: [{ type: String }],
    sectionTitle: { type: String },
    affiliation: { type: mongoose.Schema.Types.ObjectId, ref: "Affliciation" },
    facilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollegeFacility",
      },
    ],
    collegeCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    approvedThrough: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ApprovedThrough",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("College", CollegeSchema, "addcolleges");
