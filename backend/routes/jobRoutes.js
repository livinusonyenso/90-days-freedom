const { Router } = require("express");
const { body } = require("express-validator");
const { submitJobApplication } = require("../controllers/jobController");
const validate = require("../middleware/validateMiddleware");

const router = Router();

// POST /job-application — public
router.post(
  "/",
  [
    body("jobId").trim().notEmpty().withMessage("Job ID is required."),
    body("jobTitle").trim().notEmpty().withMessage("Job title is required."),
    body("fullName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Full name must be at least 2 characters."),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email address is required."),
    body("phone")
      .optional({ checkFalsy: true })
      .matches(/^[\d\s\+\-\(\)]{7,20}$/)
      .withMessage("Enter a valid phone number."),
    body("githubUrl")
      .optional({ checkFalsy: true })
      .isURL({ protocols: ["http", "https"] })
      .withMessage("GitHub URL must be a valid URL."),
    body("linkedinUrl")
      .optional({ checkFalsy: true })
      .isURL({ protocols: ["http", "https"] })
      .withMessage("LinkedIn URL must be a valid URL."),
  ],
  validate,
  submitJobApplication
);

module.exports = router;
