const { pool } = require("../config/db");

const JobApplicationModel = {
  async create({ jobId, jobTitle, fullName, email, phone, githubUrl, linkedinUrl }) {
    const [result] = await pool.execute(
      `INSERT INTO job_applications
         (job_id, job_title, full_name, email, phone, github_url, linkedin_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [jobId, jobTitle, fullName, email, phone || null, githubUrl || null, linkedinUrl || null]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT id, job_id, job_title, full_name, email, phone, github_url, linkedin_url, status, created_at
       FROM job_applications ORDER BY created_at DESC`
    );
    return rows;
  },

  async updateStatus(id, status) {
    await pool.execute(`UPDATE job_applications SET status = ? WHERE id = ?`, [status, id]);
  },
};

module.exports = JobApplicationModel;
