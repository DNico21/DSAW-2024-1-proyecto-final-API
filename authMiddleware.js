// authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key"; // Asegúrate de usar una clave secreta segura

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;