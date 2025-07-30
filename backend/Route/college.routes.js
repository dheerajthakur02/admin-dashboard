import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addCollege,
  getAllColleges,
  getCollegeById,
  editCollege,
  deleteCollege,
} from "../controllers/college.controller.js";

const router = express.Router();

router.post(
  "/add-college",
  upload.fields([
    { name: "collegeLogo", maxCount: 1 },
    { name: "collegeBanner", maxCount: 1 },
    { name: "collegeBrochure", maxCount: 1 },
    { name: "collegeGallery", maxCount: 20 },
    { name: "collegeVideo", maxCount: 10 },
  ]),
  addCollege
);
router.get("/all-colleges", getAllColleges);
router.get("/get-college/:id", getCollegeById);
router.put(
  "/edit-college/:id",
  upload.fields([
    { name: "collegeLogo", maxCount: 1 },
    { name: "collegeBanner", maxCount: 1 },
    { name: "collegeBrochure", maxCount: 1 },
    { name: "collegeGallery", maxCount: 20 },
    { name: "collegeVideo", maxCount: 10 },
  ]),
  editCollege
);
router.delete("/delete-college/:id", deleteCollege);

export default router;
