const responseStatus = require("./responseStatus");
const responseData = (data) => data && Object.keys(data).length ? data : null;

module.exports = {
  success: (data = {}) => ({
    status: responseStatus.success,
    code: 200,
    message: data.message || "Your request is successfully executed",
    data: responseData(data.data),
  }),

  failure: (data = {}) => ({
    status: responseStatus.failure,
    code: 500, 
    message: data.message || "Some error occurred while performing action.",
    data: responseData(data.data),
  }),

  internalServerError: (data = {}) => ({
    status: responseStatus.serverError,
    code: 500,
    message: data.message || "Internal server error.",
    data: responseData(data.data),
  }),

  badRequest: (data = {}) => ({
    status: responseStatus.badRequest,
    code: 400,
    message: data.message || "Request parameters are invalid or missing.",
    data: responseData(data.data),
  }),

  recordNotFound:( data = {}) => ({
    status: responseStatus.recordNotFound,
    code: 404,
    message: data.message || `this item not found with specified criteria.`,
    data: responseData(data.data),
  }),

  validationError: (data = {}) => ({
    status: responseStatus.validationError,
    code: 422,
    message: data.message || "Invalid Data, Validation Failed.",
    errors: data.errors || {},
    data: responseData(data.data),
  }),

  unAuthorized: (data = {}) => ({
    status: responseStatus.unauthorized,
    code: 401,
    message: data.message || "You are not authorized to access the request",
    data: responseData(data.data),
  }),
};