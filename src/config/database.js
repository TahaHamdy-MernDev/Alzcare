// Import the mongoose library
const mongoose = require("mongoose");

// Determine the URI based on the environment
const uri = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;

// Connect to the MongoDB database using the URI
mongoose.connect(uri);

// Get the connection object from mongoose
let db = mongoose.connection;

// Once the connection is open, log a success message
db.once('open', () => {
  console.log('Connection Successful');
});

// If there is an error in the MongoDB connection, log an error message
db.on('error', () => {
  console.log('Error in mongodb connection');
});

// Export the mongoose object for use in other files
module.exports = mongoose;
 