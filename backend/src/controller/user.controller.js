import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  //Check the field
  //Check User is already exits?
  //hashpassword
  //create user object
  // return res

  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All field is required");
  }

  const exitingUser = await User.findOne({ $or: [{ email }] });
  if (exitingUser) {
    throw new ApiError(409, "User Already Exits");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (!user) {
    throw new ApiError(500, "user not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "user created successfully"));
});
