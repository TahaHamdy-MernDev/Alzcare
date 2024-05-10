// require("dotenv").config();
const logger = require('./utils/logger');
require('dotenv-safe').config();
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

const app = require("./config/app");
require("./config/database");

const PORT = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);
const socket = require("./config/socket");

socket.initializeSocket(server);

require("./config/reminders");
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    process.exit(1);
  });
});
