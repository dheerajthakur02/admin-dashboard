import CollegeFacility from "../models/collegeFacility.model.js";

export const addCollegeFacility = async (req, res) => {
  try {
    const { name } = req.body;
    const logoFile = req.file;
    const newCollegeFacility = new CollegeFacility({
      name,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
    });
    await newCollegeFacility.save();
    res.status(201).json(newCollegeFacility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCollegeFacility = async (req, res) => {
  try {
    const collegeFacility = await CollegeFacility.find();
    res.status(200).json(collegeFacility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollegeFacilityById = async (req, res) => {
  try {
    const { id } = req.params;
    const collegeFacility = await CollegeFacility.findById(id);
    res.status(200).json(collegeFacility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCollegeFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const logoFile = req.file;
    const updateData = { name };
    if (logoFile) updateData.logo = `uploads/${logoFile.filename}`;
    const updatedCollegeFacility = await CollegeFacility.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedCollegeFacility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCollegeFacility = async (req, res) => {
  try {
    const { id } = req.params;
    await CollegeFacility.findByIdAndDelete(id);
    res.status(200).json({ message: "College facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
