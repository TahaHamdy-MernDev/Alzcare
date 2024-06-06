const databaseService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const { CommentModel, PostModel } = require("../models/communityModel");
const { uploadFile, deleteOldFiles, uploadAndSet } = require("../utils/cloudinary");
const path = require("path");
const { createAndSaveNotification } = require("../utils/notificationHelper");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notificationService");
exports.getAllUserPosts = asyncHandler(async (req, res) => {
    const posts = await databaseService.findMany(PostModel, { user: req.params.id })
    res.success({ data: posts })
})
exports.getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await databaseService.findMany(PostModel, {});
    const postsWithCommentCounts = await Promise.all(allPosts.map(async (post) => {
        const commentCount = await databaseService.count(CommentModel, { postId: post._id });
        return { ...post.toObject(), commentCount };
    }));
    res.success({ data: postsWithCommentCounts })
}) 
exports.getPost = asyncHandler(async (req, res) => {
    const post = await databaseService.findOne(PostModel, { _id: req.params.id })
    if (!post) { return res.recordNotFound({ message: "Post not found" }) }
    res.success({ data: post })
})
exports.getPostComments = asyncHandler(async (req, res) => {
    const post = await databaseService.findOne(PostModel, { _id: req.params.id })
    if (!post) { return res.recordNotFound({ message: "Post not found" }) }
    const postComments = await databaseService.findMany(CommentModel, { postId: post._id })
    let sortedComments = postComments.sort((a, b) => b.likes.length - a.likes.length);   
    res.success({ data: sortedComments })
})
exports.createPost = asyncHandler(async (req, res) => {
    const { text } = req.body
    if (req.file && req.file.filename) {
        const filePath = path.join(__dirname, `../uploads/${req.file.filename}`);
        const result = await uploadFile(filePath);
        req.body.image = {
            url: result.secure_url,
            publicId: result.public_id,
        };
    }
    let data = { ...req.body, text, user: req.user._id }
    const post = await databaseService.create(PostModel, data)
    res.success({ data: post })
})
exports.createComment = asyncHandler(async (req, res) => {
    const post = await databaseService.findOne(PostModel, { _id: req.params.id })
    if (!post) { return res.recordNotFound({ message: "Post not found" }) }
    await uploadAndSet(req, 'image')
    const user = await databaseService.findOne(User, { _id: req.user._id });
    const message = `${user.Uname} أضاف تعليقاً على منشورك`;
  
    await createAndSaveNotification(post.user._id, message);
    await sendNotification(user.deviceToken,'Community Notification', message);
    let data = { ...req.body, postId: post._id, user: req.user._id }
    const comment = await databaseService.create(CommentModel, data)
    res.success({ data: comment })
})


exports.postToggleLike = asyncHandler(async (req, res) => {
    const { id: postId } = req.params
    const loggedInUser = req.user._id
    const post = await databaseService.findOne(PostModel, { _id: postId })
    if (!post) { return res.recordNotFound({ message: "Post not found" }); }
    const likeIndex = post.likes.indexOf(loggedInUser);
    if (likeIndex === -1) {
        post.likes.push(loggedInUser);
        const user = await databaseService.findOne(User, { _id: loggedInUser });
        const message =  `${user.Uname} أضاف إعجاباً إلى منشورك`;
        await createAndSaveNotification(post.user._id, message);
        await sendNotification(user.deviceToken,'Community Notification', message);
    } else {
        post.likes.splice(likeIndex, 1);
    }
    await post.save()
    res.success({data: post,  message: 'Like status updated successfully' })
})
exports.commentToggleLike = asyncHandler(async (req, res) => {
    const { id: commentId } = req.params
    const loggedInUser = req.user._id
    const comment = await databaseService.findOne(CommentModel, { _id: commentId })
    if (!comment) { return res.recordNotFound({ message: "Comment not found" }); }
    const likeIndex = comment.likes.indexOf(loggedInUser);
    if (likeIndex === -1) {
        comment.likes.push(loggedInUser);
        const user = await databaseService.findOne(User, { _id: loggedInUser });
        const message =  `${user.Uname} أضاف إعجاباً إلى تعليقك`;
        await createAndSaveNotification(comment.user, message);
        await sendNotification(user.deviceToken,'Community Notification', message);
    } else {
        comment.likes.splice(likeIndex, 1);
    }
    await comment.save()
    res.success({ message: 'Like status updated successfully' ,data:comment})
})
exports.deletePost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params;
  
    const post = await databaseService.findOne(PostModel, { _id: postId });
    if (!post) {
      return res.recordNotFound({ message: "Post not found" });
    }
    await CommentModel.deleteMany({ postId });
    if (post.image && post.image.publicId) {
        await deleteOldFiles(post, "image");
    }

    await databaseService.deleteOne(PostModel, { _id: postId });
  
    res.success({ message: "Post deleted successfully" });
  });
  