require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const mysql = require("mysql2/promise");

async function setup() {
  console.log("🔧 Setting up database...\n");

  // Connect WITHOUT specifying a database first (so we can create it)
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  // 1. Create database + switch to it (use query, not execute — DDL not supported in prepared stmt)
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  console.log(`✅ Database '${process.env.DB_NAME}' ready`);

  await conn.query(`USE \`${process.env.DB_NAME}\``);

  // 2. Create users table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(150)  NOT NULL UNIQUE,
      password    VARCHAR(255)  NOT NULL,
      role        ENUM('user', 'admin') NOT NULL DEFAULT 'user',
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Table 'users' ready");

  // 3. Seed default admin (password: Admin@1234)
  const bcrypt = require("bcryptjs");
  const hash = await bcrypt.hash("Admin@1234", 10);

  await conn.query(
    `INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')`,
    ["Admin", "admin@90daysfreedom.com", hash]
  );
  console.log("✅ Admin seeded → admin@90daysfreedom.com / Admin@1234");

  // 4. Create contacts table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      first_name  VARCHAR(100)  NOT NULL,
      last_name   VARCHAR(100)  NOT NULL,
      email       VARCHAR(150)  NOT NULL,
      phone       VARCHAR(30)   DEFAULT NULL,
      subject     VARCHAR(100)  NOT NULL,
      message     TEXT          NOT NULL,
      status      ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Table 'contacts' ready");

  // 5. Create job_applications table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      job_id       VARCHAR(100)  NOT NULL,
      job_title    VARCHAR(200)  NOT NULL,
      full_name    VARCHAR(150)  NOT NULL,
      email        VARCHAR(150)  NOT NULL,
      phone        VARCHAR(30)   DEFAULT NULL,
      github_url   VARCHAR(300)  DEFAULT NULL,
      linkedin_url VARCHAR(300)  DEFAULT NULL,
      status       ENUM('new', 'reviewing', 'interviewed', 'rejected', 'hired') NOT NULL DEFAULT 'new',
      created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Table 'job_applications' ready");

  await conn.end();
  console.log("\n🎉 Setup complete. Run: npm run dev");
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
