const jwt = require("jsonwebtoken");

/**
 * Authentication middleware to verify JWT token.
 * Adds userId to req if valid, otherwise returns 401.
 */
module.exports = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request object
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // Token is invalid or expired
    res.status(401).json({ message: "Invalid token" });
  }
};