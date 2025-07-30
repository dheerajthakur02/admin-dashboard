import Exam from "../models/Exam.model.js";

export const addExam = async (req, res) => {
  try {
    const {
      stream,
      course,
      examName,
      title,
      displayRank,
      noOfApplication,
      purpose,
      applicationFee,
      applicationDate,
      examDate,
      resultDate,
      examLevel,
      examType,
      state,
    } = req.body;
    const logoFile = req.files?.logo?.[0];
    const pdfFile = req.files?.pdf?.[0];
    const exam = new Exam({
      stream,
      course,
      examName,
      title,
      displayRank,
      noOfApplication,
      purpose,
      applicationFee,
      applicationDate,
      examDate,
      resultDate,
      examLevel,
      examType,
      state,
      logo: logoFile ? `uploads/${logoFile.filename}` : undefined,
      pdf: pdfFile ? `uploads/${pdfFile.filename}` : undefined,
    });
    await exam.save();
    res.status(201).json({ message: "Exam added successfully!", exam });
  } catch (error) {
    console.error("Error adding exam:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("stream", "name")
      .populate("course", "name")
      .populate("examLevel", "name")
      .populate("examType", "examTypeName")
      .populate("state", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error getting exams:", error);
    res.status(500).json({ message: "Failed to fetch exams" });
  }
};

export const editExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.files?.logo?.[0]) {
      updateData.logo = `uploads/${req.files.logo[0].filename}`;
    }
    if (req.files?.pdf?.[0]) {
      updateData.pdf = `uploads/${req.files.pdf[0].filename}`;
    }
    const updated = await Exam.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam updated!", exam: updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Exam.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
