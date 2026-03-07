/**
 * migrate.js — Safe, idempotent migration runner
 *
 * Run with:  node scripts/migrate.js
 *   or add to package.json:  "migrate": "node scripts/migrate.js"
 *
 * Safe to run multiple times — uses CREATE TABLE IF NOT EXISTS.
 * Never drops tables or modifies existing data.
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const mysql = require("mysql2/promise");

// ─── All migrations in order ──────────────────────────────────────────────────
const migrations = [
  {
    name: "users",
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(100)  NOT NULL,
        email       VARCHAR(150)  NOT NULL UNIQUE,
        password    VARCHAR(255)  NOT NULL,
        role        ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
  },
  {
    name: "contacts",
    sql: `
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
    `,
  },
  {
    name: "job_applications",
    sql: `
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
    `,
  },
];

// ─── Runner ───────────────────────────────────────────────────────────────────
async function migrate() {
  console.log("🔧  Running migrations on:", process.env.DB_NAME);
  console.log("    Host:", process.env.DB_HOST, "| Port:", process.env.DB_PORT || 3306);
  console.log("");

  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT || 3306,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  let created = 0;
  let skipped = 0;

  for (const migration of migrations) {
    // Check if table already exists
    const [rows] = await conn.query(
      `SELECT TABLE_NAME FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
      [process.env.DB_NAME, migration.name]
    );

    if (rows.length > 0) {
      console.log(`  ⏭  '${migration.name}' already exists — skipped`);
      skipped++;
    } else {
      await conn.query(migration.sql);
      console.log(`  ✅  '${migration.name}' created`);
      created++;
    }
  }

  await conn.end();

  console.log("");
  console.log(`🎉  Done. ${created} table(s) created, ${skipped} already existed.`);
  if (created > 0) {
    console.log("    Restart your server to pick up any changes.");
  }
}

migrate().catch((err) => {
  console.error("\n❌  Migration failed:", err.message);
  console.error("    Check your .env DB_HOST / DB_USER / DB_PASSWORD / DB_NAME");
  process.exit(1);
});
