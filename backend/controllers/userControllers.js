import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import Practice from "../models/practiceModel.js";
import EmailService from "../services/emailService.js";

import generateToken from "../utils/generateToken.js";

const SALT = await bcrypt.genSalt(10);

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    suffix,
    phone_number,
    email,
    password,
    is_active,
    user_role,
    user_type,
  } = req.body;

  // Check if password input is present
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Generate a salt and hash the password
  const hashedPassword = await bcrypt.hash(password, SALT);

  // Create new user
  const user = await User.create({
    first_name,
    middle_name,
    last_name,
    suffix,
    phone_number,
    email,
    password_hash: hashedPassword,
    is_active: is_active || true,
    user_role: user_role || "Staff",
    user_type: user_type || "User",
  });

  // Generate token and send response
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      suffix: user.suffix,
      phone_number: user.phone_number,
      email: user.email,
      is_active: user.is_active,
      user_role: user.user_role,
      user_type: user.user_type,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/v1/users/auth
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    user.is_active == true &&
    (await bcrypt.compare(password, user.password_hash))
  ) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      suffix: user.suffix,
      phone_number: user.phone_number,
      email: user.email,
      is_active: user.is_active,
      user_role: user.user_role,
      user_type: user.user_type,
      token: generateToken(res, user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password_hash");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // Save updated user data
  if (user) {
    const { ...userData } = req.body;

    // Update user data and send response
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...userData },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password_hash");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Helper function to generate random password
const generateRandomPassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// @desc    Create a new user (for practice administrators)
// @route   POST /api/v1/users
// @access  Private
export const createUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    suffix,
    phone_number,
    email,
    user_role,
    user_type,
    practice_id,
    is_active = true,
  } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  // Generate random password
  const temporaryPassword = generateRandomPassword();

  // Hash the password
  const hashedPassword = await bcrypt.hash(temporaryPassword, SALT);

  // Create new user
  const user = await User.create({
    first_name,
    middle_name,
    last_name,
    suffix,
    phone_number,
    email,
    password_hash: hashedPassword,
    user_role,
    user_type,
    practice_id,
    is_active,
  });

  if (user) {
    try {
      // Get practice information for email
      const practice = await Practice.findById(practice_id);

      if (practice) {
        // Send welcome email with credentials
        const emailService = new EmailService();
        await emailService.sendWelcomeEmail(user, temporaryPassword, practice);

        console.log(`Welcome email sent to ${user.email}`);
      }
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the user creation if email fails
      // You might want to log this to a monitoring service
    }

    // Return user data without password
    const userResponse = {
      _id: user._id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      suffix: user.suffix,
      phone_number: user.phone_number,
      email: user.email,
      user_role: user.user_role,
      user_type: user.user_type,
      practice_id: user.practice_id,
      is_active: user.is_active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json(userResponse);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
