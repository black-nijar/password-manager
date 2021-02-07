const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers?.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'invalid token' });
  }
};
