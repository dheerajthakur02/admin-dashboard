import State from "../models/state.model.js";

export const addState = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const logoFile = req.files?.logo?.[0];
    const flagFile = req.files?.flag?.[0];

    if (!name || !code || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const state = new State({
      name,
      code,
      description,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
      flag: flagFile ? `uploads/${flagFile.filename}` : null,
    });
    await state.save();
    res.status(201).json({ message: "State added successfully!", state });
  } catch (error) {
    console.error("Error in addState:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ 
      message: "Failed to fetch states",
      error: error.message 
    });
  }
};

export const editState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;
    let updateData = { name, code, description };
    if (req.files?.logo?.[0]) {
      updateData.logo = `uploads/${req.files.logo[0].filename}`;
    }
    if (req.files?.flag?.[0]) {
      updateData.flag = `uploads/${req.files.flag[0].filename}`;
    }
    const updated = await State.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "State not found" });
    res
      .status(200)
      .json({ message: "State updated successfully!", state: updated });
  } catch (error) {
    console.error("Error in editState:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await State.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "State not found" });
    res.status(200).json({ message: "State deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteState:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
