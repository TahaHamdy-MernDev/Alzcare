require("dotenv").config()
const logger = require('./utils/logger');

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message ,err.stack}`);
  process.exit(1);
});

const app = require("./config/app");
require("./config/database");

const PORT = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
