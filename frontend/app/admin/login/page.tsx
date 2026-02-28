"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminLoginPage() {
  const { isAuthenticated, user, token } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in as admin, go straight to dashboard
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      router.replace("/admin");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid credentials.");
        setIsSubmitting(false);
        return;
      }

      // Block non-admins
      if (data.user?.role !== "admin") {
        setError("Access denied. This portal is for admins only.");
        setIsSubmitting(false);
        return;
      }

      // Persist token + user manually (same keys as UserContext)
      localStorage.setItem("freedom_token", data.token);
      localStorage.setItem("freedom_user", JSON.stringify(data.user));

      // Hard navigate so UserProvider rehydrates from localStorage
      window.location.href = "/admin";
    } catch {
      setError("Network error. Is the backend running?");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Inter', sans-serif",
        background: "#0a0f0a",
      }}
    >
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "42%",
          background: "linear-gradient(160deg, #063114 0%, #0a1f0d 60%, #020804 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(34,197,94,0.06)" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(34,197,94,0.04)" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: "0.62rem", lineHeight: 1 }}>90</span>
            <span style={{ color: "white", fontWeight: 600, fontSize: "0.42rem", lineHeight: 1, marginTop: "1px" }}>Days</span>
          </div>
          <span style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>Admin Portal</span>
        </div>

        {/* Middle text */}
        <div style={{ position: "relative" }}>
          <p style={{ color: "#22c55e", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Restricted Access
          </p>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.25, marginBottom: "1.25rem" }}>
            Manage your<br />platform with ease
          </h2>
          <p style={{ color: "#86efac", fontSize: "0.88rem", lineHeight: 1.7 }}>
            This portal is exclusively for authorized administrators. Manage users, control roles, and keep the platform running smoothly.
          </p>

          {/* Feature list */}
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {["View & manage all registered users", "Promote or demote user roles", "Remove accounts from the platform"].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span style={{ color: "#d1fae5", fontSize: "0.82rem" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", position: "relative" }}>
          © 2026 90-Days Freedom System
        </p>
      </div>

      {/* ── Right panel (form) ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          background: "#0f1410",
        }}
      >
        <div style={{ width: "100%", maxWidth: "380px" }}>

          {/* Mobile logo */}
          <div className="flex lg:hidden" style={{ alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: "0.58rem", lineHeight: 1 }}>90</span>
              <span style={{ color: "white", fontWeight: 600, fontSize: "0.4rem", lineHeight: 1, marginTop: "1px" }}>Days</span>
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>Admin Portal</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "999px", padding: "4px 12px", marginBottom: "1rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ color: "#22c55e", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em" }}>ADMIN ACCESS ONLY</span>
            </div>
            <h1 style={{ color: "white", fontWeight: 800, fontSize: "1.65rem", marginBottom: "0.4rem" }}>
              Admin Sign In
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
              Enter your admin credentials to continue.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px",
              padding: "0.7rem 1rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4M12 16h.01"/>
              </svg>
              <span style={{ color: "#ef4444", fontSize: "0.8rem", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", fontWeight: 500, marginBottom: "0.4rem" }}>
                Email Address
              </label>
              <input
                suppressHydrationWarning
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  padding: "0.7rem 0.9rem",
                  color: "white",
                  fontSize: "0.88rem",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", fontWeight: 500, marginBottom: "0.4rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  suppressHydrationWarning
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    padding: "0.7rem 2.5rem 0.7rem 0.9rem",
                    color: "white",
                    fontSize: "0.88rem",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 0, display: "flex" }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                background: isSubmitting ? "rgba(34,197,94,0.5)" : "linear-gradient(135deg,#14532d,#16a34a)",
                border: "none",
                borderRadius: "10px",
                padding: "0.8rem",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                marginTop: "0.25rem",
                letterSpacing: "0.02em",
                boxShadow: "0 0 24px rgba(34,197,94,0.2)",
                transition: "opacity 0.15s",
              }}
            >
              {isSubmitting ? "Signing in…" : "Sign In to Dashboard"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", color: "#4b5563", fontSize: "0.78rem" }}>
            Not an admin?{" "}
            <a href="/login" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
              Go to user login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
