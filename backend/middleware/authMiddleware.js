const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const accessToken = token.split(' ')[1] || token;
    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized: Token format invalid' });
    }
    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized: Token is not valid' });
    }
    if (!decoded || !decoded.payload.id) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token structure' });
    }
    const user = await User?.findById(decoded.payload.id);
    if (!user) {
      console.log('here', decoded)
      return res.status(404).json({ error: 'User not found' });
    }
    req.auth_user = user._id;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;

