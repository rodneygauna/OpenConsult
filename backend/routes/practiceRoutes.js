import express from "express";

import {
  getPractices,
  getActivePractices,
  getPracticeById,
  createPractice,
  updatePractice,
  deletePractice,
} from "../controllers/practiceControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPractices).post(protect, createPractice);
router.get("/active", protect, getActivePractices);
router
  .route("/:id")
  .get(protect, getPracticeById)
  .put(protect, updatePractice)
  .delete(protect, deletePractice);

export default router;
