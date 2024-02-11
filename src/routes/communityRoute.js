const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { authenticate } = require('../middlewares/auth');
const { upload } = require('../utils/upload');
const { validateRequestParameters } = require('../utils/validate');
const { createPostKeys, createCommentKeys } = require('../utils/validation/communityValidation');
const idValidator = require('../utils/idValidator');
router.use(authenticate)
router.get('/user/:id/posts',idValidator, communityController.getAllUserPosts);
router.get('/posts', communityController.getAllPosts);
router.post('/post',upload.single('image') ,validateRequestParameters(createPostKeys) , communityController.createPost);
router.get('/post/:id',idValidator, communityController.getPost);
router.post('/post/:id/comment',idValidator,upload.single('image'),validateRequestParameters(createCommentKeys), communityController.createComment);
router.get('/post/:id/comments',idValidator, communityController.getPostComments);
router.put('/post/:id/like',idValidator, communityController.postToggleLike);
router.put('/comment/:id/like',idValidator, communityController.commentToggleLike);

module.exports = router;
