import mongoose from "mongoose";

import {
  requiredStringMaxLength,
  optionalStringMaxLength,
  requiredNumberMinMax,
  requiredEnum,
  optionalEnum,
} from "../utils/validation/validationConstants.js";

const userSchema = new mongoose.Schema(
  {
    // User Demographics
    first_name: requiredStringMaxLength("First name", 255),
    middle_name: optionalStringMaxLength(255),
    last_name: requiredStringMaxLength("Last name", 255),
    suffix: optionalEnum(["Jr", "Sr", "I", "II", "III", "IV", "V"]),
    // User Contact Information
    phone_number: requiredNumberMinMax("Phone number", 1000000000, 9999999999),
    // User Email and Password Hash
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password_hash: requiredStringMaxLength("Password hash", 1024),
    // User Status
    is_active: {
      type: Boolean,
      default: true,
    },
    // User Role
    user_role: requiredEnum("User role", [
      "Admin",
      "Provider",
      "Specialist",
      "Staff",
    ]),
    // User Type
    user_type: requiredEnum("User type", ["User", "Super User", "Admin"]),
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
