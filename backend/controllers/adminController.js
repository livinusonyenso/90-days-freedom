const UserModel = require("../models/userModel");
const { pool } = require("../config/db");

// ─── GET /admin/users ─────────────────────────────────────────────────────────
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    console.error("Admin getAllUsers error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

// ─── DELETE /admin/users/:id ──────────────────────────────────────────────────
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ success: false, message: "You cannot delete your own account." });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    return res.status(200).json({ success: true, message: `User ${user.name} deleted.` });
  } catch (err) {
    console.error("Admin deleteUser error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

// ─── PATCH /admin/users/:id/role ──────────────────────────────────────────────
async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Role must be 'user' or 'admin'." });
    }

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ success: false, message: "You cannot change your own role." });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await pool.execute("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    return res.status(200).json({ success: true, message: `Role updated to '${role}'.`, userId: id, role });
  } catch (err) {
    console.error("Admin updateUserRole error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getAllUsers, deleteUser, updateUserRole };
