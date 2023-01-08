const express = require('express');

const router = express.Router();
const userController = require('../../controllers/api/userController');
const setAuthenticationMiddleware = require('../../config/setAuthenticationMiddleware');

router.post('/authenticate', userController.authenticateUser);
router.post('/create-user', userController.createUser);
router.post('/follow/:id', setAuthenticationMiddleware.checkAuthentication, userController.followUser);
router.post('/unfollow/:id', setAuthenticationMiddleware.checkAuthentication, userController.unfollowUser);
router.get('/user', setAuthenticationMiddleware.checkAuthentication, userController.getAuthenticatedUser);

module.exports = router;