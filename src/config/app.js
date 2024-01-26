const express = require('express');
const app = express();
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require("hpp");
const routes =require('../routes')
let logger = require('morgan');
const path =require("path")
global.__basedir = path.resolve(__dirname, '..');
const { errorHandler } = require('../utils/errorHandler');
const { corsOptions, mongoSanitizeOptions, helmetOptions } = require('./options');
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(require('../utils/response/responseHandler'));

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(xss());
app.use(hpp()); 

app.use(mongoSanitize(mongoSanitizeOptions));
app.use(helmet(helmetOptions));


app.use('/alzcare/v1', routes);

app.use("*", (req, res) => {
    res.status(404).json({ error: { message: "Route Not Found" } });
  });


app.use(errorHandler);

module.exports = app;