import ExamLevel from "../models/ExamLevel.model.js";

export const addExamLevel = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Level name is required" });
    const examLevel = new ExamLevel({ name });
    await examLevel.save();
    res
      .status(201)
      .json({ message: "Exam level added successfully!", examLevel });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllExamLevels = async (req, res) => {
  try {
    const levels = await ExamLevel.find().sort({ createdAt: 1 });
    res.status(200).json(levels);
  } catch (error) {
    console.error("Error getting exam levels:", error);
    res.status(500).json({ message: "Failed to fetch exam levels" });
  }
};

export const editExamLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await ExamLevel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Exam level not found" });
    res
      .status(200)
      .json({ message: "Exam level updated!", examLevel: updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteExamLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ExamLevel.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Exam level not found" });
    res.status(200).json({ message: "Exam level deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
