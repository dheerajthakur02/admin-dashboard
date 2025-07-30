import mongoose from "mongoose";

const DistrictSchema = new mongoose.Schema(
  {
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    districtName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("District", DistrictSchema);
