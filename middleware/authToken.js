const jwt = require('jsonwebtoken');
const config = require('../config');

function authToken(req, res, next) {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'Access denied' });

  try {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(403).send({ msg: 'Access denied' });
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = authToken;
