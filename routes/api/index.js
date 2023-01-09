const express = require('express');

const router = express.Router();
const userController = require('../../controllers/api/userController');
const postController = require('../../controllers/api/postController');
const likeController = require('../../controllers/api/likeController');
const commentController = require('../../controllers/api/commentController');
const setAuthenticationMiddleware = require('../../config/setAuthenticationMiddleware');


router.get('/home', userController.home);

router.post('/authenticate', userController.authenticateUser);
router.post('/create-user', userController.createUser);
router.post('/follow/:id', setAuthenticationMiddleware.checkAuthentication, userController.followUser);
router.post('/unfollow/:id', setAuthenticationMiddleware.checkAuthentication, userController.unfollowUser);
router.get('/user', setAuthenticationMiddleware.checkAuthentication, userController.getAuthenticatedUser);


router.post('/posts', setAuthenticationMiddleware.checkAuthentication, postController.createPost);
router.delete('/posts/:id', setAuthenticationMiddleware.checkAuthentication, postController.deletePost);


router.post('/like/:id', setAuthenticationMiddleware.checkAuthentication, likeController.likePost);
router.post('/unlike/:id', setAuthenticationMiddleware.checkAuthentication, likeController.unLikePost);

router.post('/comment/:id', setAuthenticationMiddleware.checkAuthentication, commentController.addComment);


module.exports = router;