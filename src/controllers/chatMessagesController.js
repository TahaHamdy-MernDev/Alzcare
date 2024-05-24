const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const { uploadAndSet } = require("../utils/cloudinary");
const ChatMessageModel = require("../models/chatMessageModel");
const User = require("../models/userModel");
const { createAndSaveNotification } = require("../utils/notificationHelper");
const { sendNotification } = require("../services/notificationService");
exports.getChatMessages = asyncHandler(async (req, res) => {
  const { recipientId } = req.query;
  const messages = await dbService
    .findMany(ChatMessageModel, {
      $or: [
        { $and: [{ senderId: req.user._id }, { recipientId: recipientId }] },
        { $and: [{ senderId: recipientId }, { recipientId:req.user._id }] },
      ],
    },{ sort: { timestamp: -1 } })

  res.success({ data: messages });
});
exports.createChatMessage = asyncHandler(async (req, res) => {
  const { recipientId } = req.query;
  const recipientUser = await dbService.findOne(User,{_id:recipientId})
  if(!recipientUser){
    return res.recordNotFound({message:"the recipient not found"})
  }
  const user = await dbService.findOne(User,{_id:req.user._id})
  if(!user){
    return res.recordNotFound('User')
  }
  const fileTypes = ["image", "voiceNote"];
  for (let type of fileTypes) {
    await uploadAndSet(req, type);
  }
  const title = 'New Chat Message'
  await createAndSaveNotification(recipientId, title);
  await sendNotification(recipientUser.deviceToken,title,null )
  const data = { ...req.body, senderId:req.user._id, recipientId };
  const message = await dbService.create(ChatMessageModel, data);
  res.success({ data: message });
});
