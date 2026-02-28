const { Router } = require("express");
const { getAllUsers, deleteUser, updateUserRole } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = Router();

// All admin routes require: valid JWT + role = "admin"
router.use(authMiddleware, adminMiddleware);

router.get("/users", getAllUsers);                   // GET  /admin/users
router.delete("/users/:id", deleteUser);             // DELETE /admin/users/:id
router.patch("/users/:id/role", updateUserRole);     // PATCH /admin/users/:id/role

module.exports = router;
