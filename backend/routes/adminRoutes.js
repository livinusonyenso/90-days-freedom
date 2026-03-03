const { Router } = require("express");
const { getAllUsers, deleteUser, updateUserRole } = require("../controllers/adminController");
const { getAllContacts } = require("../controllers/contactController");
const { getAllJobApplications, updateJobApplicationStatus } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = Router();

// All admin routes require: valid JWT + role = "admin"
router.use(authMiddleware, adminMiddleware);

router.get("/users", getAllUsers);                   // GET    /admin/users
router.delete("/users/:id", deleteUser);             // DELETE /admin/users/:id
router.patch("/users/:id/role", updateUserRole);     // PATCH  /admin/users/:id/role
router.get("/contacts", getAllContacts);                              // GET   /admin/contacts
router.get("/job-applications", getAllJobApplications);               // GET   /admin/job-applications
router.patch("/job-applications/:id/status", updateJobApplicationStatus); // PATCH /admin/job-applications/:id/status

module.exports = router;
