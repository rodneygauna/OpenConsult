import express from "express";

import {
  registerUser,
  authUser,
  userProfile,
  updateUser,
  getUserById,
  createUser,
} from "../controllers/userControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/", protect, createUser); // New route for creating users
router
  .get("/profile", protect, userProfile)
  .put("/profile", protect, updateUser);
router.get("/:id", protect, getUserById);

export default router;
