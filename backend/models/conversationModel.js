const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel',
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MessageModel',
                default: [],
            }
        ]
    },
    { timestamps: true }
);

const ConversationModel = new mongoose.model("Conversation", conversationSchema);
module.exports = ConversationModel;