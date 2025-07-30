import District from "../models/district.model.js";
import State from "../models/state.model.js";

export const addDistrict = async (req, res) => {
  try {
    const { state, districtName } = req.body;
    if (!state || !districtName) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const district = new District({ state, districtName });
    await district.save();
    res.status(201).json({ message: "District added successfully!", district });
  } catch (error) {
    console.error("Error in addDistrict:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find().populate("state", "name");
    res.status(200).json(districts);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch districts" });
  }
};

export const getDistrictsByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const districts = await District.find({ state: stateId }).populate(
      "state",
      "name"
    );
    res.status(200).json(districts);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch districts by state" });
  }
};

export const editDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, districtName } = req.body;
    let updateData = { state, districtName };
    const updated = await District.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "District not found" });
    res
      .status(200)
      .json({ message: "District updated successfully!", district: updated });
  } catch (error) {
    console.error("Error in editDistrict:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await District.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "District not found" });
    res.status(200).json({ message: "District deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteDistrict:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
