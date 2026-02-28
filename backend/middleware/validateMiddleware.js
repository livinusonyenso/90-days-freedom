const { validationResult } = require("express-validator");

/**
 * validateMiddleware
 * Reads express-validator errors and returns 422 if any exist.
 * Drop this after your validation chains in any route.
 */
function validateMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

module.exports = validateMiddleware;
