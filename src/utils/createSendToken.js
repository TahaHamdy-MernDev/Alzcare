const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../constants/authConstant");
const generateAuthToken = async (user) => {
  const payload = {
    _id: user.id,
    role: user.userType,
  };
  if (user.userType === USER_TYPES.CareGiver) {
    payload.patient = user.patients[0];
  }
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return { token };
};
const createSendToken = async (user, res) => {
  const { token } = await generateAuthToken(user);
  res.success({ data: { user, token } });
};

module.exports = {
  createSendToken,
  generateAuthToken,
};
