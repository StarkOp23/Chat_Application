const express = require('express');
const UserModel = require('../models/userModel');
const { invitationMail, loginMail } = require('../helper/mailHelper');
const generateToken = require('../auth service/auth');
const jwt = require('jsonwebtoken');
// const Joi = require('joi');


// let userValidationObject = Joi.object({

//     name: Joi.string().min(4).max(10).required(),
//     email: Joi.string().min().max().required(),
//     password: Joi.string().min(8).max(20).required(),
// })



let registerController = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
            // throw new Error('All fields are required');
        }
        //Existing user
        let isUserAvailable = await UserModel.findOne({ email });
        if (isUserAvailable) {
            return res.status(400).json({ message: 'User already exists in this Email id' });
            // throw new Error('Email already exists');
        }

        // User Name already exists
        let isUserNameAvailable = await UserModel.findOne({ name });
        if (isUserNameAvailable) {
            return res.status(400).json({ message: 'User already exists with this Name' });
            // throw new Error('User already exists with this Name');
        }

        // Register user in Database
        if (!isUserAvailable) {

            invitationMail(email, name)

            let user = await UserModel.create({ name, email, password });
            let userData = {
                name: user.name,
                email: user.email,
                createdAT: user.createdAT,
                updatedAt: user.updatedAt,
                _id: user._id,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
            return res.status(201).json({ error: false, message: "User resistered successful", data: userData });

        }
        res.status(400).json({ error: true, message: "User registration error" })
    }
    catch (error) {
        next(error);
    }
}


let loginController = async (req, res) => {
    try {

        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let UserAvailable = await UserModel.findOne({ email })


        console.log("Fetched user available: ", UserAvailable);

        if (!UserAvailable) {
            return res.status(404).json({ message: 'User not found' });
        }

        let isPasswordMatch = await UserAvailable.matchPassword(password);

        if (isPasswordMatch) {

            loginMail(email)

            let response =
            {
                _id: UserAvailable._id,
                name: UserAvailable.name,
                email: UserAvailable.email,
                isAdmin: UserAvailable.isAdmin,
                token: generateToken(UserAvailable._id)
            }

            // console.log(response);
            return res.status(200).json({ error: false, message: "Login successful", data: response });

        }

        res.status(404).json({ error: true, message: "Login failed , invalid credentials" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Server error" });
    }
}


let getAllUsers = async (req, res, next) => {

    try {
        // let { name, email } = req.user;
        let users = await UserModel.find();
        return res.status(200).json({ error: false, message: " Users fetched successfully", data: users })
    } catch (error) {

    }

}



module.exports = { registerController, loginController, getAllUsers }