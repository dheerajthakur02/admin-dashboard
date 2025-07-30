import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addStream,
  getAllStreams,
  getAllStreamsForPagination,
  deleteStream,
  editStream,
} from "../controllers/stream.controller.js";
const router = express.Router();

router.post(
  "/add-stream",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  addStream
);
router.get("/all", getAllStreams);
router.get("/all-streams", getAllStreamsForPagination);
router.delete("/delete-stream/:id", deleteStream);
router.put(
  "/edit-stream/:id",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  editStream
);

export default router;
