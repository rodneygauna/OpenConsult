import express from "express";

import {
  getConsults,
  getConsultsByPatientId,
  getConsultsByProviderId,
  getConsultsBySpecialistId,
  getConsultsByPracticeId,
  getConsultById,
  createConsult,
  updateConsult,
  deleteConsult,
} from "../controllers/consultControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getConsults).post(protect, createConsult);
router.get("/patient/:id", protect, getConsultsByPatientId);
router.get("/creating-provider/:id", protect, getConsultsByProviderId);
router.get("/assigned-specialist/:id", protect, getConsultsBySpecialistId);
router.get("/practice/:id", protect, getConsultsByPracticeId);
router
  .route("/:id")
  .get(protect, getConsultById)
  .put(protect, updateConsult)
  .delete(protect, deleteConsult);

export default router;
