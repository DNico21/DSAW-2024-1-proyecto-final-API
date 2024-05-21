// authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_value_if_not_set";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;