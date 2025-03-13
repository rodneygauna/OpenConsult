import mongoose from "mongoose";

import {
  requiredString,
  optionalStringMaxLength,
  requiredPhoneNumber,
  requiredEnum,
  optionalEnum,
} from "../utils/validation/validationConstants.js";

const userSchema = new mongoose.Schema(
  {
    // User Demographics
    first_name: requiredString("First name"),
    middle_name: optionalStringMaxLength(255),
    last_name: requiredString("Last name"),
    suffix: optionalEnum(["Jr", "Sr", "I", "II", "III", "IV", "V"]),
    // User Contact Information
    phone_number: requiredPhoneNumber(),
    // User Email and Password Hash
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password_hash: requiredString("Password hash"),
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
