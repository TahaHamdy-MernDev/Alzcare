const userSockets = {};

const registerUserSocket = (userId, socketId) => {
  userSockets[userId] = socketId;
};

const removeUserSocket = (socketId) => {
  const userId = Object.keys(userSockets).find(key => userSockets[key] === socketId);
  if (userId) {
    delete userSockets[userId];
  }
};

const getUserSocketId = (userId) => {
  return userSockets[userId];
};

module.exports = { registerUserSocket, removeUserSocket, getUserSocketId };