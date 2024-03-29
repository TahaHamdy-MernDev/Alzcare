const socketIO = require("socket.io");
const cron = require("node-cron");
const { findAndNotifyReminders } = require("./reminders");
const ChatMessageModel = require("../models/chatMessageModel");
const dbService = require("../utils/dbService");
const User = require("../models/userModel");
const NotificationModel = require("../models/notificationModel");
let io;
const userSockets = {};

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected with socket ID:", socket.id);
    socket.on('registerUser', (userId) => {
      console.log(`Registering user ${userId} with socket ${socket.id}`); 
      userSockets[userId] = socket.id;
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected with socket ID ${socket.id}`); 
      Object.keys(userSockets).forEach(userId => {
        if(userSockets[userId] === socket.id) {
          delete userSockets[userId];
        }
      });
    });


    socket.on("sendChatMessage", async ({ senderId, recipientId}) => {
      const recipientSocketId = userSockets[recipientId];
      if (recipientSocketId) {
        const user = await dbService.findOne(User, { _id: senderId})
        const message = `new message from ${user.firstName} ${user.lastName}`;
        io.to(recipientSocketId).emit("receiveChatMessage", message );
      } else {
        const notification = new NotificationModel({
          user: recipientId,
          message: message,
        });
        notification.save();
        console.log(`No active socket for recipient user ${recipientId}`);
      }
    });
  });

  return io;
}

function getIo() {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }
  return io;
}

cron.schedule("* * * * *", () => {
  console.log("Checking for medication reminders...");
  findAndNotifyReminders(io, userSockets);
});

module.exports = { initializeSocket, getIo };