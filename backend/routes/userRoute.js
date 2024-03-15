const express = require('express');
const router = express.Router();

const protectMiddleware = require('../middlewares/protectRoute')
const userController = require('../controllers/userController')
router.route('/')
    .get(protectMiddleware.isAuthenticatedUser, userController.getUsersForSidebar)
module.exports = router;