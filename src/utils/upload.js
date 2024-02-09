const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },

    filename: function (req, file, cb) {
        cb(null, `${Date.now()}--${uuidv4()}--${file.originalname}`);
    }

});

// Create Multer upload instance with size limit
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB in bytes
    }
});

module.exports = { upload }