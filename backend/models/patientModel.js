import mongoose from "mongoose";

import {
  requiredStringMaxLength,
  optionalString,
  requiredDate,
  requiredEnum,
  optionalEnum,
  requiredPhoneNumber,
  optionalPhoneNumber,
  requireRef,
} from "../utils/validation/validationConstants.js";

const patientSchema = new mongoose.Schema(
  {
    // Patient Name
    first_name: requiredStringMaxLength("First name", 255),
    middle_name: optionalString(),
    last_name: requiredStringMaxLength("Last name", 255),
    suffix: optionalString(),
    // Patient Date of Birth
    date_of_birth: requiredDate("Date of birth"),
    // Patient Contact Information
    mobile_number: requiredPhoneNumber(),
    home_number: optionalPhoneNumber(),
    work_number: optionalPhoneNumber(),
    email: optionalString(),
    // Patient Address
    address: requiredStringMaxLength("Address", 255),
    apartment_unit_room: optionalString(),
    po_box_address: optionalString(),
    city: requiredStringMaxLength("City", 255),
    state: requiredStringMaxLength("State", 2),
    zip_code: requiredNumberMinMax("Zip code", 10000, 99999),
    // Patient Sex
    sex: requiredEnum("Sex assigned at birth", [
      "M", // Male
      "F", // Female
      "U", // Unknown
      "I", // Intersex
      "X", // X
      "N", // Not listed
    ]),
    // Patient Gender Identity
    gender_identity: optionalEnum([
      "Male",
      "Female",
      "Transgender Male",
      "Transgender Female",
      "Transgender (as non-binary)",
      "Non-binary",
      "Gender-queer",
      "Two-spirit",
      "Questioning/not sure",
      "Choose not to disclose",
      "Unknown",
      "Not listed",
    ]),
    // Patient Sexual Orientation
    sexual_orientation: optionalEnum([
      "Straight or heterosexual",
      "Gay, Lesbian or homosexual",
      "Bisexual",
      "Pansexual",
      "Queer",
      "Asexual",
      "Two-spirit",
      "Questioning/not sure",
      "Choose not to disclose",
      "Not listed",
    ]),
    // Practice Reference
    practice_id: requireRef("Practice"),
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);
