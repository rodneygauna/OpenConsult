import mongoose from "mongoose";

import {
  requiredStringMaxLength,
  requiredString,
  optionalString,
  requiredEnum,
  requireRef,
} from "../utils/validation/validationConstants.js";

const consultResultSchema = new mongoose.Schema(
  {
    // Consult Reference
    consult_id: requireRef("Consult"),
    // Specialist Reference
    specialist_id: requireRef("User"),
    // Consult Conclusion
    conclusion: requiredString("Conclusion"),
    // Consult Diagnosis
    diagnoses: [
      {
        // Diagnosis Name
        code: optionalString("Diagnosis code"),
        // Diagnosis Description
        description: optionalString("Diagnosis description"),
      },
    ],
    // Consult Treatment
    treatment: optionalString("Treatment"),
  },
  { timestamps: true }
);

export const ConsultResult = mongoose.model(
  "ConsultResult",
  consultResultSchema
);
