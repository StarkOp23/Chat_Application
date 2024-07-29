const mongoose = require('mongoose');

let ChatServerSchema = mongoose.Schema({
    chatName: { type: 'string', },
    isGroupChat: { type: 'boolean' },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},

    {
        timestamps: true
    }
)

const Chat = mongoose.Model("Chat", ChatServerSchema)
module.exports = Chat;