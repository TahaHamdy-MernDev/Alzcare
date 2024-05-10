const socketIO = require("socket.io");
const {
  registerUserSocket,
  removeUserSocket,
  getUserSocketId,
} = require("../utils/socketManager");
const { createAndSaveNotification } = require("../utils/notificationHelper");
const User = require("../models/userModel");
const dbService = require("../utils/dbService");
const cron = require("node-cron");
const ChatMessageModel = require("../models/chatMessageModel");
const { PostModel } = require("../models/communityModel");

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected with socket ID:", socket.id);

    socket.on("registerUser", (userId) => {
      console.log(`Registering user ${userId} with socket ${socket.id}`);
      registerUserSocket(userId, socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected with socket ID ${socket.id}`);
      removeUserSocket(socket.id);
    });
    socket.on("sendChatMessage", async ({ senderId, recipientId }) => {
      console.log(senderId, recipientId);
      const user = await dbService.findOne(User, { _id: senderId });
      console.log(user);
      const message = `new message from ${user.Uname}`;
      const recipientSocketId = getUserSocketId(recipientId);
      await createAndSaveNotification(recipientId, message);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveChatMessage", message);
      } else {
        console.log(`No active socket for recipient user ${recipientId}`);
      }
    });
    socket.on("communityNotifications", async ({ whoAddAction, postId, action }) => {
      const post = await dbService.findOne(PostModel, { _id: postId })
      const user = await dbService.findOne(User, { _id: whoAddAction });
      const message = `${user.Uname} add ${action} on your post ${post.text}`;
      const recipientSocketId = getUserSocketId(post.user._id);
      await createAndSaveNotification(post.user._id, message);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveCommunityNotifications", message);
      } else {
        console.log(`No active socket for recipient user ${post.user._id}`);
      }
    });
    socket.on("likeCommentNotification", async ({ userId, commentId }) => {
      const comment = await dbService.findOne(CommentModel, { _id: commentId });
      if (!comment) {
        console.log(`Comment with ID ${commentId} not found`);
        return;
      }
      const user = await dbService.findOne(User, { _id: userId });
      const message = `${user.Uname} has liked your comment: "${comment.text}"`;
      const recipientSocketId = getUserSocketId(comment.user._id);
      await createAndSaveNotification(comment.user._id, message);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveLikeCommentNotification", message);
      } else {
        console.log(`No active socket for recipient user ${comment.user._id}`);
      }
    });

  });


  cron.schedule("* * * * *", async () => {
    console.log("Running a task every minute");
    await findAndNotifyReminders(io);
  });
  return io;
}
module.exports = { initializeSocket };

// const socketIO = require("socket.io");
// const cron = require("node-cron");
// const { findAndNotifyReminders } = require("./reminders");
// const ChatMessageModel = require("../models/chatMessageModel");
// const dbService = require("../utils/dbService");
// const User = require("../models/userModel");
// const NotificationModel = require("../models/notificationModel");
// let io;
// const userSockets = {};

// function initializeSocket(server) {
//   io = socketIO(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected with socket ID:", socket.id);
//     socket.on('registerUser', (userId) => {
//       console.log(`Registering user ${userId} with socket ${socket.id}`);
//       userSockets[userId] = socket.id;
//     });
//     socket.on("disconnect", () => {
//       console.log(`User disconnected with socket ID ${socket.id}`);
//       Object.keys(userSockets).forEach(userId => {
//         if(userSockets[userId] === socket.id) {
//           delete userSockets[userId];
//         }
//       });
//     });

//     socket.on("sendChatMessage", async ({ senderId, recipientId}) => {
//       const recipientSocketId = userSockets[recipientId];
//       if (recipientSocketId) {
//         const user = await dbService.findOne(User, { _id: senderId})
//         const notification = new NotificationModel({
//           user: recipientId,
//           message: message,
//         });
//         notification.save();
//         const message = `new message from ${user.firstName} ${user.lastName}`;
//         io.to(recipientSocketId).emit("receiveChatMessage", message );
//       } else {
//         const notification = new NotificationModel({
//           user: recipientId,
//           message: message,
//         });
//         notification.save();
//         console.log(`No active socket for recipient user ${recipientId}`);
//       }
//     });
//   });

//   return io;
// }

// function getIo() {
//   if (!io) {
//     throw new Error("Socket.IO has not been initialized");
//   }
//   return io;
// }

// cron.schedule("* * * * *", () => {
//   console.log("Checking for medication reminders...");
//   findAndNotifyReminders(io, userSockets);
// });

// module.exports = { initializeSocket, getIo };
