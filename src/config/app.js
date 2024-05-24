const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const routes = require('../routes');
const { errorHandler } = require('../utils/errorHandler');
const { corsOptions, mongoSanitizeOptions, helmetOptions } = require('./options');
global.__basedir = path.resolve(__dirname, '..');
const logger = require('../utils/logger');
const admin= require('./firebase/firebase')
app.use(require('../utils/response/responseHandler'));
const cron = require('node-cron');
const { findAndNotifyReminders } = require('./reminders');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

function getDurationInMilliseconds(start) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => { 
      const durationInMilliseconds = getDurationInMilliseconds(start);
      logger.info(`[${req.method}] ${req.baseUrl} ${res.statusCode} ${durationInMilliseconds.toLocaleString()} ms`);
  });
  next();
});



app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(hpp());
app.use(cors(corsOptions)); 
app.use(mongoSanitize(mongoSanitizeOptions)); 
app.use(helmet(helmetOptions)); 

app.use('/alzcare/v1', routes); 
app.get('/', (req, res) => {
  // const userId = '661d70d61be4f317ee45409c';
  res.render('socket');
});
cron.schedule("* * * * *", async () => {
  console.log("Running a task every minute");
  await findAndNotifyReminders();
});
async function sendWelcomeNotification(userToken) {
  const message = {
    notification: {
      title: 'النوتفكيشن اشتغلت ي ندى',
      body: 'ياريت نبطل رغي بقي 🙂😂'
    },
    // token: userToken
    token: "cDDrSRKNStK9EbTdxOrrjg:APA91bGM2YS4-dEx8H0FoVJJy1chzGZ23nlZuO3GXNjp0TslO5EK0XPNru_CusSYw5jTmWPoHVf1BQ6S96Z1Azg9w6eKJ2UMqT4b5Vy3JlIs5F-DMdyZh2_ja3LMweSnszCPXHDgm8C0"
  };


await admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      if (error.code === 'messaging/registration-token-not-registered') {
        console.error('Registration token is not registered. Removing it from the database...');

      } else {
        console.error('Error sending message:', error);
      }})
}
// sendWelcomeNotification();
app.use('*', (req, res) => {
  return res.recordNotFound('This Route')
});
app.use(errorHandler);

module.exports = app;
