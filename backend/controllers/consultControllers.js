import asyncHandler from "express-async-handler";

import Consult from "../models/consultModel.js";

// @desc    Get all consults
// @route   GET /api/v1/consults
// @access  Private
export const getConsults = asyncHandler(async (req, res) => {
  const consults = await Consult.find({});
  res.json(consults);
});

// @desc    Get consults by patient ID
// @route   GET /api/v1/consults/patient/:id
// @access  Private
export const getConsultsByPatientId = asyncHandler(async (req, res) => {
  const consults = await Consult.find({ patient: req.params.id });
  res.json(consults);
});

// @desc    Get consults by creating provider ID
// @route   GET /api/v1/consults/creating-provider/:id
// @access  Private
export const getConsultsByProviderId = asyncHandler(async (req, res) => {
  const consults = await Consult.find({ creating_provider: req.params.id });
  res.json(consults);
});

// @desc    Get consults by assigned specialist ID
// @route   GET /api/v1/consults/assigned-specialist/:id
// @access  Private
export const getConsultsBySpecialistId = asyncHandler(async (req, res) => {
  const consults = await Consult.find({ assigned_specialist: req.params.id });
  res.json(consults);
});

// @desc    Get consults by practice ID
// @route   GET /api/v1/consults/practice/:id
// @access  Private
export const getConsultsByPracticeId = asyncHandler(async (req, res) => {
  const consults = await Consult.find({ practice: req.params.id });
  res.json(consults);
});

// @desc    Get consult by ID
// @route   GET /api/v1/consults/:id
// @access  Private
export const getConsultById = asyncHandler(async (req, res) => {
  const consult = await Consult.findById(req.params.id);

  if (consult) {
    res.json(consult);
  } else {
    res.status(404);
    throw new Error("Consult not found");
  }
});

// @desc    Create new consult
// @route   POST /api/v1/consults
// @access  Private
export const createConsult = asyncHandler(async (req, res) => {
  const consult = new Consult({
    ...req.body,
  });

  const createdConsult = await consult.save();
  res.status(201).json(createdConsult);
});

// @desc    Update consult
// @route   PUT /api/v1/consults/:id
// @access  Private
export const updateConsult = asyncHandler(async (req, res) => {
  const consult = await Consult.findById(req.params.id);

  if (consult) {
    const { ...consultData } = req.body;

    const updatedConsult = await Consult.findByIdAndUpdate(
      consult._id,
      { ...consultData },
      { new: true }
    );

    res.json(updatedConsult);
  } else {
    res.status(404);
    throw new Error("Consult not found");
  }
});

// @desc    Delete consult
// @route   DELETE /api/v1/consults/:id
// @access  Private
export const deleteConsult = asyncHandler(async (req, res) => {
  const consult = await Consult.findById(req.params.id);

  if (consult) {
    await consult.remove();
    res.json({ message: "Consult removed" });
  } else {
    res.status(404);
    throw new Error("Consult not found");
  }
});
