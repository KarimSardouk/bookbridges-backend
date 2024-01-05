const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, 'process.env.JWT_SECRET', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
}
// authMiddleware.js (add this function)
function authorizeRole(role) {
  return (req, res, next) => {
    const userRole = req.user.userRole;

    if (userRole !== role) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
}
module.exports = { authenticateToken,authorizeRole };
