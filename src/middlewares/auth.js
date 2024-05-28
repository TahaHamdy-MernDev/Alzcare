const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../constants/authConstant");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] === "Bearer" && tokenParts.length === 2) {
      const token = tokenParts[1];
      try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          res.unAuthorized({ message: "Token has expired." });
        } else {
          res.unAuthorized({ message: "Invalid token." });
        }
      }
    } else { 
      res.unAuthorized({ message: "Token must be a Bearer token." });
    }
  } else {
    res.unAuthorized({ message: "No token provided." });
  }
}; 

const authorizeRoles =
  (allowedRoles) =>
  (req, res, next) => {
    authenticate(req, res, () => {
      console.log(req.user.role);
      console.log(allowedRoles);
      if (allowedRoles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({
          status: "Forbidden",
          code: 403,
          message:
            "Forbidden: You do not have permission to perform this action.",
          data: null,
        });
      }
    });
  };

module.exports = {
  authenticate,
  Admin: authorizeRoles([USER_TYPES.Admin]),
  CareGiver: authorizeRoles([USER_TYPES.CareGiver]),
  Patient: authorizeRoles([USER_TYPES.Patient]),
};
