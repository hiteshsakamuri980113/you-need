const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Assuming you're using Passport.js or similar
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

module.exports = isAuthenticated;
