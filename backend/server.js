require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { testConnection } = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:4000")
  .split(",")
  .map((o) => o.trim());

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
app.use("/auth", authRoutes);
app.use("/", courseRoutes);       // GET /courses, GET /hire-talent
app.use("/admin", adminRoutes);   // GET /admin/users

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
  });
}

start();
