const router = require("express").Router();
const chatController = require("../../controllers/chatMessagesController");
const {authenticate} = require("../../middlewares/auth");
const { upload } = require("../../utils/upload");
router.get("/get-all",authenticate, chatController.getChatMessages);
router.post(
  "/create",
  authenticate,
  upload.fields([
    { name: "voiceNote", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  chatController.createChatMessage
);

module.exports = router;
