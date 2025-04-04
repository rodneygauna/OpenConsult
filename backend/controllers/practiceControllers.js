import asyncHandler from "express-async-handler";

import Practice from "../models/practiceModel.js";

// @desc    Get all practices
// @route   GET /api/v1/practices
// @access  Private
export const getPractices = asyncHandler(async (req, res) => {
  const practices = await Practice.find({});
  res.status(201).json(practices);
});

// @desc    Get all active practices
// @route   GET /api/v1/practices/active
// @access  Private
export const getActivePractices = asyncHandler(async (req, res) => {
  const practices = await Practice.find({ is_active: true });
  res.status(201).json(practices);
});

// @desc    Get practice by ID
// @route   GET /api/v1/practices/:id
// @access  Private
export const getPracticeById = asyncHandler(async (req, res) => {
  const practice = await Practice.findById(req.params.id);

  if (practice) {
    res.status(201).json(practice);
  } else {
    res.status(404);
    throw new Error("Practice not found");
  }
});

// @desc    Create new practice
// @route   POST /api/v1/practices
// @access  Private
export const createPractice = asyncHandler(async (req, res) => {
  const practice = new Practice({
    ...req.body,
  });

  const createdPractice = await practice.save();
  res.status(201).json(createdPractice);
});

// @desc    Update practice
// @route   PUT /api/v1/practices/:id
// @access  Private
export const updatePractice = asyncHandler(async (req, res) => {
  const practice = await Practice.findById(req.params.id);

  if (practice) {
    const { ...practiceData } = req.body;

    const updatedPractice = await Practice.findByIdAndUpdate(
      practice._id,
      { ...practiceData },
      { new: true }
    );
    res.status(201).json(updatedPractice);
  } else {
    res.status(404);
    throw new Error("Practice not found");
  }
});

// @desc    Delete practice
// @route   DELETE /api/v1/practices/:id
// @access  Private
export const deletePractice = asyncHandler(async (req, res) => {
  const practice = await Practice.findById(req.params.id);

  if (practice) {
    await practice.remove();
    res.status(201).json({ message: "Practice removed" });
  } else {
    res.status(404);
    throw new Error("Practice not found");
  }
});
