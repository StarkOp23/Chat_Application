const express = require('express');
const { authToken } = require('../middleware/authmiddle');
const { accessChat, fetchedChats, fetchedGroups, createGroupChat, groupExit } = require('../controllers/chatController');
let router = express.Router();

router.route('/').post(authToken, accessChat);
router.route('/').get(authToken, fetchedChats);
router.route('/fetchedGroups').get(authToken, fetchedGroups);
router.route('/createGroup').post(authToken, createGroupChat);
router.route('/groupExit').put(authToken, groupExit);



module.exports = router;

