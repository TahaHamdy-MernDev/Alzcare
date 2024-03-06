const responseBody = require('./index');
const responseHandler = (req, res, next) => {
  res.success = (data = {}) => {
    res.status(responseBody.success(data).code).json(responseBody.success(data));
  };
  res.failure = (data = {}) => {
    res.status(responseBody.failure(data).code).json(responseBody.failure(data));
  };
  res.internalServerError = (data = {}) => {
    res.status(responseBody.internalServerError(data).code).json(responseBody.internalServerError(data));
  };
  res.badRequest = (data = {}) => {
    res.status(responseBody.badRequest(data).code).json(responseBody.badRequest(data));
  };
  res.recordNotFound = (data = {}) => {
    res.status(responseBody.recordNotFound(data).code).json(responseBody.recordNotFound(data));
  };
  res.validationError = (data = {}) => {
    res.status(responseBody.validationError(data).code).json(responseBody.validationError(data));
  };
  res.unAuthorized = (data = {}) => {
    res.status(responseBody.unAuthorized(data).code).json(responseBody.unAuthorized(data));
  };
  next();
};

module.exports = responseHandler;