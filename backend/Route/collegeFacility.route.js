import express from "express";

import {
  addCollegeFacility,
  getAllCollegeFacility,
  getCollegeFacilityById,
  updateCollegeFacility,
  deleteCollegeFacility,
} from "../controllers/collegeFacility.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/add-college-facility", upload.single("logo"), addCollegeFacility);
router.get("/all-college-facility", getAllCollegeFacility);
router.get("/college-facility/:id", getCollegeFacilityById);
router.put(
  "/update-college-facility/:id",
  upload.single("logo"),
  updateCollegeFacility
);
router.delete("/delete-college-facility/:id", deleteCollegeFacility);

export default router;
