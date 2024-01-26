function errorHandler(error, req, res, next) {
  console.log(error);
  return res.internalServerError({ data: { message: error.message } });
}

module.exports = { errorHandler };
