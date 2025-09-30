const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory, getConversation } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.post('/message', protect, sendMessage);
router.get('/history', protect, getChatHistory);
router.get('/conversation/:id', protect, getConversation);

module.exports = router;
