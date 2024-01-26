const validateParamsWithJoi = (schemaKeys) => {
  return (req, res, next) => {
    // console.log(req.body)
    const { error } = schemaKeys.validate(req.body, { abortEarly: false, convert: false });
    if (error) {
      const message = error.details.map((el) => el.message)
      // return res.validationError({data:message, message :  `Invalid values in parameters` });
      return res.validationError({ message });
    }
    next();
  };
};

module.exports = { validateParamsWithJoi };
