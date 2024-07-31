const express = require('express');
let Router = express.Router();
let { registerController, loginController, getAllUsers } = require('../controllers/userController');


Router.post('/login', loginController);
Router.post('/register', registerController);
Router.get('/getall', getAllUsers);


module.exports = Router