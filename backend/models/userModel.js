const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Please enter your name"],
            maxLength: [50, "Your name cannot exceed 50 characters"],
        },
        username: {
            type: String,
            required: [true, "Please enter your username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [6, "Your password must be longer than 6 characters"],
            select: false,
        },
        // confirmPassword: {
        //     type: String,
        //     required: [true, "Please enter your confirm password"],
        //     minLength: [6, "Your password must be longer than 6 characters"],
        //     select: false,
        // },
        gender: {
            type: String,
            require: true,
            enum: ["male", "female"]
        },
        // avatar: {
        //     public_id: String,
        //     url: String,
        // },

        // https://avatar-placeholder.iran.liara.run/
        profilePic: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            default: "user",
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 12)
})

// Return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// compare user password(this func working on login time)
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this?.password || "");
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash and set to resetpasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

const UserModel = new mongoose.model("User", userSchema);
module.exports = UserModel;