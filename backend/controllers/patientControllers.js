import asyncHandler from "express-async-handler";

import Patient from "../models/patientModel.js";

// @desc    Get all patients
// @route   GET /api/v1/patients
// @access  Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  res.json(patients);
});

// @desc    Get patient by ID
// @route   GET /api/v1/patients/:id
// @access  Private
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc    Create new patient
// @route   POST /api/v1/patients
// @access  Private
const createPatient = asyncHandler(async (req, res) => {
  const patient = new Patient({
    ...req.body,
  });

  const createdPatient = await patient.save();
  res.status(201).json(createdPatient);
});

// @desc    Update patient
// @route   PUT /api/v1/patients/:id
// @access  Private
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    const { ...patientData } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      patient._id,
      { ...patientData },
      { new: true }
    );

    res.json(updatedPatient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc    Delete patient
// @route   DELETE /api/v1/patients/:id
// @access  Private
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    await patient.remove();
    res.json({ message: "Patient removed" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});
