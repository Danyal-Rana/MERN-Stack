import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const myUser = await User.findById(userId);
        const accessToken = myUser.generateAccessToken();
        const refreshToken = myUser.generateRefreshToken();
        myUser.refreshToken = refreshToken;
        await myUser.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Token generation failed");
    } 
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    const {username, email, fullName, password} = req.body;
    // console.log(email);

    // validation (is email in correct format etc., we can also apply this on frontend)
    if (
        [fullName, email, username, password].some( (field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check if user already exists (via username and email)
    const existedUser = await User.findOne({
        $or: [ {username}, {email} ]
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists.");
    } // console.log(req.files);

    // check for images, check for avatar, (multer gives .files)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage && req.files.coverImage.length > 0)) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // upload image/avatar to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed");
    }

    // create user object (bcz mongo has objects) - create entry in db
    const user = await User.create ({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    // check for user creation (if not, send error)
    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    };

    // if created, return res
    // if (createdUser) {
    //     return new ApiResponse(201, createdUser, "User created Successfully.");
    // };
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully.")
    );
})

const loginUser = asyncHandler (async (req, res) => {
    // get req.body->data, username and password from frontend
    const {email, username, password} = req.body;

    // username or email
    if (!(email || username)) {
        throw new ApiError(400, "Email or Username is required");
    }

    // find the user in db
    const userExistence = await User.findOne ({
        $or: {
            $or: [{username}, {email}]
        }
    })
    if(!userExistence) {
        throw new ApiError(404, "User not found");
    }

    // check if password is correct
    const isPasswordValid = await userExistence.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    // generate access and refresh token
    const {accessToken, refreshToken} =await generateAccessAndRefreshTokens(userExistence._id);
    const loggedInUser = await User.findById(userExistence._id).select("-password -refreshToken");

    // send tokens(in form of secure cookies) and send res
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully."
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    // finding user and setting refreshToken to undefined
    await User.findByIdAndUpdate (
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    // clearing cookies
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out."));
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request.");
    }

    try {
        // verify token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        )
    
        // find user
        const user = await User.findById(decodedToken?._id)
    
        // check if user exis
        if (!user) {
            throw new ApiError(401, "Unauthorized Request.");
        }
    
        // match refresh token
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used.");
        }
    
        // generate new access and refresh tokens
        const options =  {
            httpOnly: true,
            secure: true,    
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json (
            new ApiResponse(
                200, 
                {accessToken, newRefreshToken},
                "Access Token Refreshed."
            )
        )
    } catch (error) {
        throw new ApiError (401, error?.message || "Unauthorized Request.")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    // get the user
    const user = await User.findById(req.user._id);
    const isPassCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPassCorrect) {
        throw new ApiError(400, "Invalid password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully."));
});

const getCurrentUser = asyncHandler( async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User details fetched successfully."));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {fullName, email} = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email,
            }
        },
        {new: true}
    ).select("-password");

    return res
    .status(200)
    .json (new ApiResponse(200, user, "Account details Updated Successfully."));
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(500, "Avatar uploading failed.");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password");

    return res
    .status(200)
    .json (new ApiResponse(200, user, "Avatar updated successfully."));
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "coverImage file is required.");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage.url) {
        throw new ApiError(500, "coverImage uploading failed.");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password");

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover Image updated successfully."));
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const {username} = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "Username is required.");
    }

    // return type of .aggregate is array
    const channel = await User.aggregate([
        {
            $match: {
                username: username?.lowercase()
            }
        },
        {
            $lookup: {
                from: "subscriptions", // Subscrption model : subscriptions in db
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {
                            $in: [req.user?._id, "$subscribers.subscriber"]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ]);

    if (!channel?.length) {
        throw new ApiError(404, "Channel does not exists.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, channel[0], "Channel profile fetched successfully."));
});

const getWatchHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistroy",
                foreignField: "_id",
                as : "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200, user[0].watchHistory, "Watch history fetched successfully."));
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
}