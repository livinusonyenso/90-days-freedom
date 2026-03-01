const { Router } = require("express");
const { body } = require("express-validator");
const { submitContact } = require("../controllers/contactController");
const validate = require("../middleware/validateMiddleware");

const router = Router();

// POST /contact — public route, no auth required
router.post(
  "/",
  [
    body("firstName").trim().notEmpty().withMessage("First name is required."),
    body("lastName").trim().notEmpty().withMessage("Last name is required."),
    body("email").isEmail().normalizeEmail().withMessage("A valid email is required."),
    body("phone")
      .optional({ checkFalsy: true })
      .matches(/^[\d\s\+\-\(\)]{7,20}$/)
      .withMessage("Enter a valid phone number."),
    body("subject").trim().notEmpty().withMessage("Please select a subject."),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters."),
  ],
  validate,
  submitContact
);

module.exports = router;
