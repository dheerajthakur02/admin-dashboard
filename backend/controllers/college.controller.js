import College from "../models/College.model.js";
import mongoose from "mongoose";

export const addCollege = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);
    console.log("Raw facilities data:", req.body.facilities);
    console.log("Raw collegeCourses data:", req.body.collegeCourses);
    console.log("Raw approvedThrough data:", req.body.approvedThrough);

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

    console.log("Extracted fields:", {
      name,
      popularName,
      shortName,
      establishedYear,
      campusSize,
      typeMode,
      affiliation,
      facilities,
      collegeCourses,
      approvedThrough,
    });

    const logoFile = req.files?.collegeLogo?.[0];
    const bannerFile = req.files?.collegeBanner?.[0];
    const brochureFile = req.files?.collegeBrochure?.[0];
    const galleryFiles = req.files?.collegeGallery || [];
    const videoFiles = req.files?.collegeVideo || [];

    console.log("File processing:", {
      logoFile: logoFile?.filename,
      bannerFile: bannerFile?.filename,
      brochureFile: brochureFile?.filename,
      galleryFilesCount: galleryFiles.length,
      videoFilesCount: videoFiles.length,
    });

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

    console.log("Processed address:", addressObj);

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
    if (facilities) collegeData.facilities = facilities;
    if (collegeCourses) collegeData.collegeCourses = collegeCourses;
    if (approvedThrough) collegeData.approvedThrough = approvedThrough;

    const college = new College(collegeData);

    console.log("College object created:", college);

    const savedCollege = await college.save();
    console.log("College saved successfully with ID:", savedCollege._id);
    console.log("College saved to collection:", savedCollege.collection.name);
    console.log(
      "Full saved college data:",
      JSON.stringify(savedCollege, null, 2)
    );
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
    console.log("Fetching all colleges...");
    const College = mongoose.model("College");
    console.log("College model collection name:", College.collection.name);

    const colleges = await College.find()
      .populate("affiliation")
      .populate("facilities")
      .populate("collegeCourses")
      .populate("approvedThrough")
      .populate("state")
      .populate("district")
      .sort({ createdAt: -1 });

    console.log(`Found ${colleges.length} colleges`);
    console.log("Colleges data:", JSON.stringify(colleges, null, 2));
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

    // Handle file uploads
    if (req.files?.collegeLogo?.[0]) {
      updateData.collegeLogo = `uploads/${req.files.collegeLogo[0].filename}`;
    }
    if (req.files?.collegeBanner?.[0]) {
      updateData.collegeBanner = `uploads/${req.files.collegeBanner[0].filename}`;
    }
    if (req.files?.collegeBrochure?.[0]) {
      updateData.collegeBrochure = `uploads/${req.files.collegeBrochure[0].filename}`;
    }
    if (req.files?.collegeGallery) {
      updateData.collegeGallery = req.files.collegeGallery.map(
        (file) => `uploads/${file.filename}`
      );
    }
    if (req.files?.collegeVideo) {
      updateData.collegeVideo = req.files.collegeVideo.map(
        (file) => `uploads/${file.filename}`
      );
    }

    // Handle multiple selections for facilities, collegeCourses, and approvedThrough
    if (req.body.facilities) {
      updateData.facilities = req.body.facilities;
    }
    if (req.body.collegeCourses) {
      updateData.collegeCourses = req.body.collegeCourses;
    }
    if (req.body.approvedThrough) {
      updateData.approvedThrough = req.body.approvedThrough;
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
