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

router.post("/add-college", upload.any(), addCollege);
router.get("/all-colleges", getAllColleges);
router.get("/get-college/:id", getCollegeById);
router.put("/edit-college/:id", upload.any(), editCollege);
router.delete("/delete-college/:id", deleteCollege);

export default router;
