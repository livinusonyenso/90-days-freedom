const { pool } = require("../config/db");

const UserModel = {
  /**
   * Find a user by email.
   */
  async findByEmail(email) {
    const [rows] = await pool.execute(
      "SELECT id, name, email, password, role, created_at FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  /**
   * Find a user by id (no password returned).
   */
  async findById(id) {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new user.
   */
  async create({ name, email, hashedPassword, role = "user" }) {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  },

  /**
   * Return all users — no passwords.
   */
  async findAll() {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    return rows;
  },
};

module.exports = UserModel;
