-- Run this file once to set up your database
-- mysql -u root -p < config/schema.sql

CREATE DATABASE IF NOT EXISTS freedom_system;
USE freedom_system;

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  role        ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: seed an admin account (password: Admin@1234)
-- The hash below is bcrypt of "Admin@1234" with 10 rounds
INSERT IGNORE INTO users (name, email, password, role)
VALUES (
  'Admin',
  'admin@90daysfreedom.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'admin'
);
