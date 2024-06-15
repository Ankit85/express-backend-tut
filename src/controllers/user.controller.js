import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../services/cloudinary.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (
    [username, fullName, email, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User email already exist");
  }

  const avatar = req.files?.avatar[0]?.path;
  const coverImage = req.files?.coverImage[0]?.path;
  console.log("AVATAR LOCAL URL", avatar);
  console.log("coverImage LOCAL URL", coverImage);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const cloudinaryAvatarURl = await uploadCloudinary(avatar);
  const cloudinaryCoverImageURl = await uploadCloudinary(coverImage);

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    fullName,
    avatar: cloudinaryAvatarURl?.url,
    coverImage: cloudinaryCoverImageURl?.url || "",
  });

  const createdUser = await User.findOne(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };
