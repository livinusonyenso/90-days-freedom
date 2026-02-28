/**
 * adminMiddleware
 * Must be used AFTER authMiddleware.
 * Allows access only to users with role = "admin".
 */
function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authenticated." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden. Admins only." });
  }

  next();
}

module.exports = adminMiddleware;
