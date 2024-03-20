const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    message: {
      type: String,
    },
    voiceNote: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ChatMessageModel = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessageModel;
