import ExamType from "../models/examType.model.js";

export const createExamType = async (req, res) => {
  try {
    const { shortName, fullName } = req.body;
    const newExamType = new ExamType({ examTypeName: { shortName, fullName } });
    await newExamType.save();
    res.status(201).json(newExamType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllExamType = async (req, res) => {
  try {
    const examType = await ExamType.find();
    res.status(200).json(examType);
  } catch (error) {
    console.error("Error getting exam types:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateExamType = async (req, res) => {
  try {
    const { id } = req.params;
    const { examTypeName } = req.body;
    const updatedExamType = await ExamType.findByIdAndUpdate(
      id,
      { examTypeName },
      { new: true }
    );
    res.status(200).json(updatedExamType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExamType = async (req, res) => {
  try {
    const { id } = req.params;
    await ExamType.findByIdAndDelete(id);
    res.status(200).json({ message: "Exam Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const examType = await ExamType.findById(id);
    res.status(200).json(examType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
