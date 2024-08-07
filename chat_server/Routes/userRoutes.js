const express = require('express');
let Router = express.Router();
let { registerController, loginController, getAllUsers } = require('../controllers/userController');
const { authToken } = require('../middleware/authmiddle');
// const auth = require('../middleware/authmiddle');


Router.post('/login', loginController);
Router.post('/register', registerController);
Router.get('/getall', authToken, getAllUsers);


module.exports = Router