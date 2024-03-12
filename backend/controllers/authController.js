// middleware
const catchAsyncErrors = require('../middlewares/catchAsyncError');

// model
const UserModel = require('../models/userModel')

// utils
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');
// const emailTemplate = require('../utils/emailTemplates')
// const sendEmail = require('../utils/sendEmail');
// const { delete_file, upload_file } = require('../utils/cloudinary')

// npm packages
const crypto = require('crypto');

// Register User - /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { fullname, username, email, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
        return next(new ErrorHandler("passwords don't match", 400))
    }

    // Find username in the database
    const user = await UserModel.findOne({ username })

    if (user) {
        return next(new ErrorHandler("Username alreay exist", 401))
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = await UserModel.create({
        fullname,
        username,
        email,
        password,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    sendToken(newUser, 201, res)
})

// Login User - /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username)
    console.log(password)

    if (!username || !password) {
        return next(new ErrorHandler('please enter the username & password', 400))
    }

    // Find user in the database
    const user = await UserModel.findOne({ username }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid username or password", 401))
    }

    // check if password is correct
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid username or password', 401))
    }

    sendToken(user, 200, res)
})

// Logout user = /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        message: "Logged Out",
    });
});
