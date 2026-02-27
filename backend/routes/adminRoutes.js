const { Router } = require("express");
const { getAllUsers } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = Router();

// GET /admin/users — requires valid JWT + role = "admin"
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
