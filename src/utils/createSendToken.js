const jwt = require("jsonwebtoken");
const generateAuthToken = async (user) => {
  let token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn:  process.env.JWT_EXPIRE });
  return { token };
};
const createSendToken =async (user, res) => {
  const { token } = await generateAuthToken(user);
  res.success({ data: { user, token } });
};

module.exports = {
  createSendToken,
  generateAuthToken,
};
