const { pool } = require("../config/db");

const ContactModel = {
  async create({ firstName, lastName, email, phone, subject, message }) {
    const [result] = await pool.execute(
      `INSERT INTO contacts (first_name, last_name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone || null, subject, message]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name, email, phone, subject, message, status, created_at
       FROM contacts ORDER BY created_at DESC`
    );
    return rows;
  },

  async markRead(id) {
    await pool.execute(`UPDATE contacts SET status = 'read' WHERE id = ?`, [id]);
  },
};

module.exports = ContactModel;
