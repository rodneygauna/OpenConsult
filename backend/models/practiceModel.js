import mongoose from "mongoose";

import {
  requiredStringMaxLength,
  optionalString,
  requiredNumberMinMax,
  requiredPhoneNumber,
  optionalPhoneNumber,
} from "../utils/validation/validationConstants.js";

const practiceSchema = new mongoose.Schema(
  {
    // Practice Name
    practice_name: requiredStringMaxLength("Practice name", 255),
    // Practice Address
    address: requiredStringMaxLength("Address", 255),
    suite_unit_number: optionalString(),
    po_box_address: optionalString(),
    city: requiredStringMaxLength("City", 255),
    state: requiredStringMaxLength("State", 2),
    zip_code: requiredNumberMinMax("Zip code", 10000, 99999),
    // Practice Contact Information
    phone_number: requiredPhoneNumber(),
    fax_number: optionalPhoneNumber(),
    // Practice Email
    email: optionalString(),
    // Practice Status
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Practice", practiceSchema);
