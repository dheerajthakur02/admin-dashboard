import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    examName: { type: String, required: true },
    title: { type: String },
    displayRank: { type: Number, default: 0 },
    noOfApplication: { type: String },
    purpose: { type: String },
    applicationFee: { type: Number, default: 0 },
    applicationDate: { type: Date },
    examDate: { type: Date },
    resultDate: { type: Date },
    examLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamLevel",
      required: true,
    },
    examType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamType",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    logo: { type: String },
    pdf: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);
