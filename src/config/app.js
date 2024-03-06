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
const { errorHandler } = require('../utils/errorHandler');
const { corsOptions, mongoSanitizeOptions, helmetOptions } = require('./options');
global.__basedir = path.resolve(__dirname, '..');
// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set the response handler
app.use(require('../utils/response/responseHandler'));

// Middleware
app.use(logger('dev')); // Logging
app.use(express.json({ limit: '10kb' })); // JSON body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded body parser with size limit
app.use(xss()); // Cross-site scripting protection
app.use(hpp()); // HTTP parameter pollution protection
app.use(cors(corsOptions)); // Cross-origin resource sharing
app.use(mongoSanitize(mongoSanitizeOptions)); // MongoDB query injection protection
app.use(helmet(helmetOptions)); // Helmet security headers

// Routes
app.use('/alzcare/v1', routes); // Main API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger API documentation

// Error handling
app.use('*', (req, res) => {
  return res.recordNotFound('This Route')
});
app.use(errorHandler);

module.exports = app;
