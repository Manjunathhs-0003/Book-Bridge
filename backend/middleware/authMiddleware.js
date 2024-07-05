const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  next();
};

module.exports = authMiddleware;