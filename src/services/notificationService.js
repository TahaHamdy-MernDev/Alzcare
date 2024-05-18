const admin = require('../config/firebase/firebase')
const sendNotification = (deviceToken, title, body) => {
    const message = {
      notification: {
        title: title,
        body: body
      },
      token: deviceToken
    };
  
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  };
  
  module.exports = { sendNotification };