require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const mysql = require("mysql2/promise");

async function migrate() {
  console.log("🔧 Running migration: job_applications table...\n");

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

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
  console.log("\n🎉 Migration complete. Restart the server.");
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
