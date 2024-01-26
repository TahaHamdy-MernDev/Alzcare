const jwt = require('jsonwebtoken')
const authenticate = (req, res, next) => {
//   const accessToken = req.cookies.accessToken
//   if (!accessToken) return res.status(401).json({ success: false, error: 'No token provided' });
//   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ success: false, error: 'Invalid token' });
//     req.user = user;
//   })
//   next();
const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1]; 
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "no token provided, access denied" });
  }
}

const authorizeRoles = (allowedRole) => (req, res, next) => {

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
	authorizeAdmin: authorizeRoles('Admin'),
	authorizeInstructor: authorizeRoles('Instructor'),
	authorizeStudent: authorizeRoles('Student'),
};