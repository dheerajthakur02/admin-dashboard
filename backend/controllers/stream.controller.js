import Stream from "../models/stream.model.js";

export const addStream = async (req, res) => {
  try {
    const { name, about, section_title, section_description } = req.body;
    const logoFile = req.files?.logo?.[0];

    // Build sections array from titles and descriptions
    const sections = [];
    if (Array.isArray(section_title) && Array.isArray(section_description)) {
      for (let i = 0; i < section_title.length; i++) {
        sections.push({
          title: section_title[i],
          description: section_description[i],
        });
      }
    } else if (section_title && section_description) {
      // Handle single section (not array)
      sections.push({
        title: section_title,
        description: section_description,
      });
    }

    const stream = new Stream({
      name,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
      about,
      sections,
    });
    await stream.save();
    res.status(201).json({
      success: true,
      message: "Stream added successfully",
      data: stream,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.json({ success: true, data: streams });
  } catch (error) {
    console.error("Error getting streams:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch streams",
      error: error.message,
    });
  }
};

// New endpoint for getting all streams (for pagination)
export const getAllStreamsForPagination = async (req, res) => {
  try {
    const streams = await Stream.find().sort({ createdAt: -1 });
    res.json(streams);
  } catch (error) {
    console.error("Error getting streams:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch streams",
      error: error.message,
    });
  }
};

// Delete stream endpoint
export const deleteStream = async (req, res) => {
  try {
    const { id } = req.params;
    const stream = await Stream.findByIdAndDelete(id);

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: "Stream not found",
      });
    }

    res.json({
      success: true,
      message: "Stream deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting stream:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete stream",
      error: error.message,
    });
  }
};

// Edit stream endpoint
export const editStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, about } = req.body;
    const logoFile = req.files?.logo?.[0];

    const updateData = {
      name,
      about,
    };

    if (logoFile) {
      updateData.logo = `uploads/${logoFile.filename}`;
    }

    const stream = await Stream.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: "Stream not found",
      });
    }

    res.json({
      success: true,
      message: "Stream updated successfully",
      data: stream,
    });
  } catch (error) {
    console.error("Error updating stream:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update stream",
      error: error.message,
    });
  }
};
