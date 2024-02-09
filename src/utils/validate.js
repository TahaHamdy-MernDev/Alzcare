
const validateRequestParameters = (validationSchema) => {
  return (req, res, next) => {
    const validationResult = validationSchema.validate(req.body, { abortEarly: false, convert: false });

    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map((errorDetail) => errorDetail.message);
      console.error(`Validation error: ${errorMessages.join(', ')}`);
      return res.validationError({ message: errorMessages });
    }

    next();
  };
};

module.exports = { validateRequestParameters };