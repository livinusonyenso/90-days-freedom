const { Router } = require("express");
const { getCourses, getHireTalent } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

// GET /courses  — protected
router.get("/courses", authMiddleware, getCourses);

// GET /hire-talent  — protected
router.get("/hire-talent", authMiddleware, getHireTalent);

module.exports = router;
