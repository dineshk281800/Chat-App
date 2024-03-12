const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const protectMiddleware = require('../middlewares/protectRoute')

router.route('/register')
    .post(authController.registerUser)
router.route('/login')
    .post(authController.loginUser)
router.route('/logout')
    .get(authController.logoutUser)

// router.route('/password/forgot')
//     .post(protectController.forgotPassword)
// router.route('/password/reset/:token')
//     .put(protectController.resetPassword)

// router.route('/me')
//     .get(protectMiddleware.isAuthenticatedUser, authController.getUserProfile)
// router.route('/me/update')
//     .put(protectMiddleware.isAuthenticatedUser, authController.updateProfile)
// router.route('/password/update')
//     .put(protectMiddleware.isAuthenticatedUser, authController.updatePassword)
// router.route('/me/upload_avatar')
//     .put(protectMiddleware.isAuthenticatedUser, authController.uploadAvatar)

// router.route('/admin/users')
//     .get(protectMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), authController.allUsers)

// router.route('/admin/users/:id')
//     .get(protectMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), authController.getUserDetails)
//     .put(protectMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), authController.updateUser)
//     .delete(protectMiddleware.isAuthenticatedUser, authMiddleware.authorizeRoles("admin"), authController.deleteUser)
module.exports = router;