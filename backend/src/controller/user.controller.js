import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/apiResponse.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(500, "Something went wrong, while generating token");
  }
};

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

export const loginUser = asyncHandler(async (req, res) => {
  //get the data
  //check the field
  //check the user exits
  //check the password
  //create token
  // send res

  const { name, email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email or password are required");
  }
  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    throw new ApiError(404, "User does not exit");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await generateToken(user._id);
  const loggedInUser = await User.findById(user._id);
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfylly"
      )
    );
});


export const logoutUser = asyncHandler(async(req, res) => {
  
})