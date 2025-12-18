import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createPin,
  getPins,
  getPinBySlug
} from "../controllers/pinControllers.js";

const router = express.Router();
router.get("/", getPins);
router.get("/:slug", getPinBySlug);
router.post("/", protect, upload.single("image"), createPin);
export default router;
