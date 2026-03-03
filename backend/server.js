require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { testConnection } = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
const allowedOrigins = [
  "https://codedlng.com",
  "https://www.codedlng.com",
  "http://localhost:3000",
  "http://localhost:4000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight for all routes
app.options("*", cors());

app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
// Specific-prefix routes first, catch-all "/" last
app.use("/auth", authRoutes);             // POST /auth/register, /auth/login, GET /auth/me
app.use("/contact", contactRoutes);       // POST /contact
app.use("/job-application", jobRoutes);   // POST /job-application
app.use("/admin", adminRoutes);           // GET|DELETE|PATCH /admin/...
app.use("/", courseRoutes);               // GET /courses, GET /hire-talent (must be last)

// ─── Root route ───────────────────────────────────────────────────────────────
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "90-Days Freedom System API is running.",
    version: "1.0.0",
    endpoints: {
      auth: ["POST /auth/register", "POST /auth/login", "GET /auth/me"],
      courses: ["GET /courses", "GET /hire-talent"],
      contact: ["POST /contact"],
      jobs: ["POST /job-application"],
      admin: ["GET /admin/users", "DELETE /admin/users/:id", "PATCH /admin/users/:id/role", "GET /admin/contacts"],
    },
  });
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_, res) => res.json({ status: "ok" }));

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   ENV: ${process.env.NODE_ENV || "development"}`);
    console.log("   Routes loaded:");
    console.log("     POST /auth/register  POST /auth/login  GET /auth/me");
    console.log("     POST /contact");
    console.log("     POST /job-application  ✅");
    console.log("     GET|DELETE|PATCH /admin/...");
    console.log("     GET /courses  GET /hire-talent");
  });
}

start();
