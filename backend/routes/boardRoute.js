import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createBoard } from "../controllers/boardControllers.js";

const router = express.Router();
router.post("/", protect, createBoard);
export default router;
