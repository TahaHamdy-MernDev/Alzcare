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

app.use(require('../utils/response/responseHandler'));

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
  const userId = '65b2e4be2936cb7634a912c4';
  res.render('socket', { userId: userId });
});

app.use('*', (req, res) => {
  return res.recordNotFound('This Route')
});
app.use(errorHandler);

module.exports = app;
