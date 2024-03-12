const express = require('express');
const router = express.Router();
const protectMiddleware = require('../middlewares/protectRoute')
const messageController = require('../controllers/messageController')
router.route('/:id')
    .get(protectMiddleware.isAuthenticatedUser, messageController.getMessages)
router.route('/send/:id')
    .post(protectMiddleware.isAuthenticatedUser, messageController.sendMessages)

module.exports = router;
