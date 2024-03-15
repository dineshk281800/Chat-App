// middleware
const catchAsyncErrors = require('../middlewares/catchAsyncError');

// model
const UserModel = require('../models/userModel')
exports.getUsersForSidebar = catchAsyncErrors(async (req, res, next) => {
    try {
        const looggedInUserId = req.user._id

        const filteredUsers = await UserModel.find({ _id: { $ne: looggedInUserId } })

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in getUsersForSiderbar:", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
})