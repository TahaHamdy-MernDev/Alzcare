const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../postman/swagger.json');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const routes = require('../routes');
// const { errorHandler } = require('../utils/errorHandler');
const { corsOptions, mongoSanitizeOptions, helmetOptions } = require('./options');
global.__basedir = path.resolve(__dirname, '..');


app.use(require('../utils/response/responseHandler'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(logger('dev'));
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(xss()); 
app.use(hpp());
app.use(cors(corsOptions)); 
app.use(mongoSanitize(mongoSanitizeOptions)); 
app.use(helmet(helmetOptions)); 


app.use('/alzcare/v1', routes); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
app.get('/', (req, res) => {
  const userId = '65b2e4be2936cb7634a912c4';
  res.render('socket', { userId: userId });
});

app.use('*', (req, res) => {
  return res.recordNotFound('This Route')
});
// app.use(errorHandler);

module.exports = app;
