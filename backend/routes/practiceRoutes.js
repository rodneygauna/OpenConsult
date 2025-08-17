import express from "express";

import {
  getPractices,
  getActivePractices,
  getPracticeById,
  getUsersForPractice,
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
router.get("/:id/users", protect, getUsersForPractice);

export default router;
