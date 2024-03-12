const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            require: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            require: true
        },
        message: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const MessageModel = new mongoose.model("Message", messageSchema);
module.exports = MessageModel;