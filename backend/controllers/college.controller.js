import College from "../models/College.model.js";
import mongoose from "mongoose";

export const addCollege = async (req, res) => {
  try {
    const {
      name,
      popularName,
      shortName,
      establishedYear,
      campusSize,
      typeMode,
      address,
      state,
      district,
      collegeShortDescription,
      collegeLongDescription,
      sectionTitle,
      affiliation,
      facilities,
      collegeCourses,
      approvedThrough,
    } = req.body;

    // Validate required fields
    if (!name || !typeMode) {
      return res.status(400).json({
        message: "Name and Type Mode are required fields",
      });
    }

    // Handle files from upload.any()
    const allFiles = req.files || [];
    const logoFile = allFiles.find((file) => file.fieldname === "collegeLogo");
    const bannerFile = allFiles.find(
      (file) => file.fieldname === "collegeBanner"
    );
    const brochureFile = allFiles.find(
      (file) => file.fieldname === "collegeBrochure"
    );
    const galleryFiles = allFiles.filter(
      (file) => file.fieldname === "collegeGallery"
    );
    const videoFiles = allFiles.filter(
      (file) => file.fieldname === "collegeVideo"
    );

    // Process address object
    const addressObj = {};
    if (address) {
      try {
        const addressData = JSON.parse(address);
        addressObj.line1 = addressData.line1;
        addressObj.line2 = addressData.line2;
        addressObj.pincode = addressData.pincode;
      } catch (e) {
        // If parsing fails, try to get from individual fields
        const line1 = req.body["address[line1]"];
        const line2 = req.body["address[line2]"];
        const pincode = req.body["address[pincode]"];

        // Handle both array and single value formats
        addressObj.line1 = Array.isArray(line1) ? line1[0] : line1;
        addressObj.line2 = Array.isArray(line2) ? line2[0] : line2;
        addressObj.pincode = Array.isArray(pincode) ? pincode[0] : pincode;
      }
    } else {
      // Direct field access
      const line1 = req.body["address[line1]"];
      const line2 = req.body["address[line2]"];
      const pincode = req.body["address[pincode]"];

      // Handle both array and single value formats
      addressObj.line1 = Array.isArray(line1) ? line1[0] : line1;
      addressObj.line2 = Array.isArray(line2) ? line2[0] : line2;
      addressObj.pincode = Array.isArray(pincode) ? pincode[0] : pincode;
    }

    // Create college object without empty fields
    const collegeData = {
      name,
      popularName,
      shortName,
      establishedYear,
      campusSize,
      typeMode,
      address: addressObj,
      collegeShortDescription,
      collegeLongDescription,
      sectionTitle,
      collegeLogo: logoFile ? `uploads/${logoFile.filename}` : undefined,
      collegeBanner: bannerFile ? `uploads/${bannerFile.filename}` : undefined,
      collegeBrochure: brochureFile
        ? `uploads/${brochureFile.filename}`
        : undefined,
      collegeGallery: galleryFiles.map((file) => `uploads/${file.filename}`),
      collegeVideo: videoFiles.map((file) => `uploads/${file.filename}`),
    };

    // Only add fields if they have values
    if (state) collegeData.state = state;
    if (district) collegeData.district = district;
    if (affiliation) collegeData.affiliation = affiliation;

    // Handle multiple selections for facilities, collegeCourses, and approvedThrough
    if (facilities && Array.isArray(facilities)) {
      collegeData.facilities = facilities.filter((f) => f && f !== "");
    } else if (facilities) {
      collegeData.facilities = [facilities].filter((f) => f && f !== "");
    }

    if (collegeCourses && Array.isArray(collegeCourses)) {
      collegeData.collegeCourses = collegeCourses.filter((c) => c && c !== "");
    } else if (collegeCourses) {
      collegeData.collegeCourses = [collegeCourses].filter(
        (c) => c && c !== ""
      );
    }

    if (approvedThrough && Array.isArray(approvedThrough)) {
      collegeData.approvedThrough = approvedThrough.filter(
        (a) => a && a !== ""
      );
    } else if (approvedThrough) {
      collegeData.approvedThrough = [approvedThrough].filter(
        (a) => a && a !== ""
      );
    }

    const college = new College(collegeData);

    const savedCollege = await college.save();
    res.status(201).json({
      message: "College added successfully!",
      college: savedCollege,
    });
  } catch (error) {
    console.error("Error adding college:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getAllColleges = async (req, res) => {
  try {
    const College = mongoose.model("College");

    const colleges = await College.find()
      .populate("affiliation")
      .populate("facilities")
      .populate("collegeCourses")
      .populate("approvedThrough")
      .populate("state")
      .populate("district")
      .sort({ createdAt: -1 });
    res.status(200).json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({
      message: "Failed to fetch colleges",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findById(id)
      .populate("affiliation")
      .populate("facilities")
      .populate("collegeCourses")
      .populate("approvedThrough")
      .populate("state")
      .populate("district");

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json(college);
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({ message: "Failed to fetch college" });
  }
};

export const editCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Process address object
    if (req.body.address) {
      try {
        const addressData = JSON.parse(req.body.address);
        updateData.address = {
          line1: addressData.line1,
          line2: addressData.line2,
          pincode: addressData.pincode,
        };
      } catch (e) {
        // If parsing fails, try to get from individual fields
        updateData.address = {
          line1: req.body["address[line1]"],
          line2: req.body["address[line2]"],
          pincode: req.body["address[pincode]"],
        };
      }
    }

    // Handle file uploads from upload.any()
    const allFiles = req.files || [];
    const logoFile = allFiles.find((file) => file.fieldname === "collegeLogo");
    const bannerFile = allFiles.find(
      (file) => file.fieldname === "collegeBanner"
    );
    const brochureFile = allFiles.find(
      (file) => file.fieldname === "collegeBrochure"
    );
    const galleryFiles = allFiles.filter(
      (file) => file.fieldname === "collegeGallery"
    );
    const videoFiles = allFiles.filter(
      (file) => file.fieldname === "collegeVideo"
    );

    if (logoFile) {
      updateData.collegeLogo = `uploads/${logoFile.filename}`;
    }
    if (bannerFile) {
      updateData.collegeBanner = `uploads/${bannerFile.filename}`;
    }
    if (brochureFile) {
      updateData.collegeBrochure = `uploads/${brochureFile.filename}`;
    }
    if (galleryFiles.length > 0) {
      updateData.collegeGallery = galleryFiles.map(
        (file) => `uploads/${file.filename}`
      );
    }
    if (videoFiles.length > 0) {
      updateData.collegeVideo = videoFiles.map(
        (file) => `uploads/${file.filename}`
      );
    }

    // Handle state and district fields
    if (req.body.state) updateData.state = req.body.state;
    if (req.body.district) updateData.district = req.body.district;

    // Handle multiple selections for facilities, collegeCourses, and approvedThrough
    if (req.body.facilities && Array.isArray(req.body.facilities)) {
      updateData.facilities = req.body.facilities.filter((f) => f && f !== "");
    } else if (req.body.facilities) {
      updateData.facilities = [req.body.facilities].filter(
        (f) => f && f !== ""
      );
    }

    if (req.body.collegeCourses && Array.isArray(req.body.collegeCourses)) {
      updateData.collegeCourses = req.body.collegeCourses.filter(
        (c) => c && c !== ""
      );
    } else if (req.body.collegeCourses) {
      updateData.collegeCourses = [req.body.collegeCourses].filter(
        (c) => c && c !== ""
      );
    }

    if (req.body.approvedThrough && Array.isArray(req.body.approvedThrough)) {
      updateData.approvedThrough = req.body.approvedThrough.filter(
        (a) => a && a !== ""
      );
    } else if (req.body.approvedThrough) {
      updateData.approvedThrough = [req.body.approvedThrough].filter(
        (a) => a && a !== ""
      );
    }

    const updated = await College.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "College not found" });
    res.status(200).json({ message: "College updated!", college: updated });
  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await College.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "College not found" });
    res.status(200).json({ message: "College deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
