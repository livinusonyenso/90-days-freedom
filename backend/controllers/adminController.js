const UserModel = require("../models/userModel");

// ─── GET /admin/users ─────────────────────────────────────────────────────────
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("Admin getAllUsers error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getAllUsers };
