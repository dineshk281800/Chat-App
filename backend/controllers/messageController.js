// middleware
const catchAsyncErrors = require('../middlewares/catchAsyncError');

// model
const ConversationModel = require('../models/conversationModel');
const MessageModel = require('../models/messageModel');

// // utils
// const ErrorHandler = require('../utils/errorHandler');
// const sendToken = require('../utils/sendToken');

exports.sendMessages = catchAsyncErrors(async (req, res, next) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        // console.log(senderId);
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        // console.log(conversation)

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in send message controller:", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
})

exports.getMessages = catchAsyncErrors(async (req, res, next) => {
    console.log("get message");
})