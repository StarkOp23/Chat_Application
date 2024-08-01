const express = require('express');
const Chat = require('../models/chatModels');
const User = require('../models/userModel');


let accessChat = async (req, res) => {
    let { userId } = req.body

    if (!userId) {
        console.log("UserId not sent to the server");
        return res.sendStatus(404);
    }

    let isChat = await Chat.find({
        isGroupchat: false,
        $and: [
            { users: { $elematch: { $eq: req.user._id } } },
            { users: { $elematch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    //Sender of the message
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email"
    });


    // If there is a exiting chat
    if (isChat.length > 0) {
        res.sned(isChat[0])
    }
    // If there is no existing chat
    else {
        var chatData = {
            chatName: "sender",
            isGroupchat: false,
            users: [req.user._id, userId],
        }
        console.log(chatData);

        try {

            let newCreatedChat = await Chat.create(chatData);
            let fullChat = await Chat.findOne({ _id: newCreatedChat._id })
                .populate("users", "-password");

            return res.status(200).json(fullChat);

        } catch (error) {
            res.status(404);
            throw new Error(error.message);
        }
    }
}

let fetchedChats = async (req, res) => {
    try {

        Chat.find({ users: { $elematch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name email"
                })
            })
        res.status(200).json(results);

    } catch (error) {
        res.sendStatus(400);
        throw new Error(error.message);
    }
}

let fetchedGroups = async (req, res) => {

    try {
        let allGroups = await Chat.where("isGroupChat").equals(true);
        res.status(200).json(allGroups);
    } catch (error) {
        res.status(404).send(error.message)
    }


}

let createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Data is insufficient" });
    }

    var users = JSON.parse(req.body.users);
    console.log("chatController/createGroups : ", req);
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};


let groupExit = async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
};




module.exports =
{
    accessChat,
    fetchedChats,
    fetchedGroups,
    createGroupChat,
    groupExit,
}