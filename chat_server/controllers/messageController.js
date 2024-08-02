const express = require('express');

const Message = require('../models/messageModel');
const Chat = require('../models/chatModels');
const User = require('../models/userModel');

let allMessages = async (req, res) => {
    try {

        let messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', "name email")
            .populate('chat')
            .populate('reciever')

        res.json(messages);

    } catch (error) {
        res.status(404);
        throw new Error(error.message);
    }
}

let sendMessage = async (req, res) => {
    let { content, chatId } = req.body;
    if (!content || !chatId) {
        return res.status(400).json({ message: 'Content and chatId are required' });
        // throw new Error('Content and chatId are required');
    }
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage);

        console.log(message);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await message.populate("reciever");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}


module.exports =
{
    allMessages,
    sendMessage
}