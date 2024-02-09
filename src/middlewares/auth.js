const jwt = require('jsonwebtoken');
const { USER_TYPES } = require('../constants/authConstant');
/**
 * Middleware function to authenticate a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call.
 * @returns {Object} - The response object.
 */
const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res.unAuthorized({ message: "invalid token, access denied" });
    }
  } else {
    return res.unAuthorized({ message: "no token provided, access denied" });
  }
}

/**
 * Authorizes access based on user role.
 * @param {string} allowedRole - The role allowed to access the resource.
 * @returns {Function} - Middleware function to authorize access.
*/
const authorizeRoles = (allowedRole) => (req, res, next) => {
  /**
   * Authenticates the request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
  */
  authenticate(req, res, () => {
    const hasMatchingRole = req.user.role === allowedRole
    if (hasMatchingRole) {
      next();
    } else {
      res.status(403).json({ success: false, error: "Access forbidden: You do not have the necessary role(s) to access this resource." });
    }
  });
};

module.exports = {
  authenticate,
  Admin: authorizeRoles(USER_TYPES.Admin),
  CareGiver: authorizeRoles(USER_TYPES.CareGiver),
  Patient: authorizeRoles(USER_TYPES.Patient),
};