function errorHandler(error, req, res, next) {
  console.log(error.stack);
  return res.internalServerError( { message: error.message });
}

module.exports = { errorHandler };
