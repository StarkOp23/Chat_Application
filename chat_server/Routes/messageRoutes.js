const express = require('express');
const { authToken } = require('../middleware/authmiddle');
const { allMessages, sendMessage } = require('../controllers/messageController');
const router = express.Router();

router.route('/:chat').get(authToken, allMessages);
router.route('/allMessages').get(authToken, sendMessage);


module.exports = router;