import mongoose from "mongoose";

const StateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // State Name
    code: { type: String, required: true }, // State Code (short/abbreviation)
    description: { type: String, required: true },
    logo: { type: String },
    flag: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("State", StateSchema);
