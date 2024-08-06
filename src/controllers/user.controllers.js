import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend 
    const { fullname, email, username, password } = req.body;
    console.log("Received user data:", { fullname, email, username, password });

    // validation - in case user left the fields empty
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }

    // check if user already exist
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(400, "User already exists");
    }

    // check for images and avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    console.log("Local paths:", { avatarLocalPath, coverImageLocalPath });

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    // upload on cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar ) {
        throw new ApiError(400, "Failed to upload avatar or avatar URL is missing");
    }
    console.log("Uploaded files:", { avatar, coverImage });

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar,
        coverImage: coverImage || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // remove password and refresh token from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "User not created");
    }

    // if user created return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

export { registerUser };
