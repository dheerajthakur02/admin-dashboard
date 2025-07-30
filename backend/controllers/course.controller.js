import Course from "../models/course.model.js";

export const addCourse = async (req, res) => {
  try {
    const {
      stream,
      degree,
      name,
      description,
      admissionProcess,
      eligibilityCriteria,
      entranceExams,
      howToPrepare,
    } = req.body;

    const logoFile = req.files?.logo?.[0];

    const course = new Course({
      stream,
      degree,
      name,
      description,
      admissionProcess,
      eligibilityCriteria,
      entranceExams,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
      howToPrepare,
    });

    await course.save();
    return res.status(201).json({ message: "Course added successfully!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("stream").populate("degree");
    res.json({ courses });
  } catch (error) {
    console.error("Error getting courses:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.query;
    const course = await Course.findById(id)
      .populate("stream")
      .populate("degree");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      stream,
      degree,
      name,
      description,
      admissionProcess,
      eligibilityCriteria,
      entranceExams,
      howToPrepare,
    } = req.body;
    const logoFile = req.files?.logo?.[0];
    const updateData = {
      stream,
      degree,
      name,
      description,
      admissionProcess,
      eligibilityCriteria,
      entranceExams,
      howToPrepare,
    };
    if (logoFile) {
      updateData.logo = `uploads/${logoFile.filename}`;
    }
    const updated = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully!", course: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete course", error: error.message });
  }
};
