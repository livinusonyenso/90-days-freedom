"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    if (!result.success) setError(result.message);
    setIsSubmitting(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{
        background: "radial-gradient(ellipse at 75% 50%, #0d4a14 0%, #071a09 45%, #020804 100%)",
      }}
    >
      {/* Title */}
      <h1
        className="font-bold text-white text-center uppercase mb-5"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
          letterSpacing: "0.18em",
          fontWeight: 800,
        }}
      >
        THE 90-DAY FREEDOM SYSTEM
      </h1>

      {/* Subtitle */}
      <p
        className="text-center font-bold mb-7"
        style={{
          color: "#00e676",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.45rem",
          letterSpacing: "0.01em",
        }}
      >
        Log In
      </p>

      {/* Error */}
      {error && (
        <p
          className="text-center"
          style={{
            color: "#ff5252",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            marginBottom: "0.5rem",
            maxWidth: "260px",
          }}
        >
          {error}
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
        style={{ maxWidth: "260px" }}
      >
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.75rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "none",
              borderRadius: "6px",
              padding: "0.6rem 0.75rem",
              fontSize: "0.82rem",
              color: "#111",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              width: "100%",
            }}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.75rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "none",
              borderRadius: "6px",
              padding: "0.6rem 0.75rem",
              fontSize: "0.82rem",
              color: "#111",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              width: "100%",
            }}
          />
        </div>

        {/* Remember Me */}
        <label
          className="flex items-center gap-2 cursor-pointer"
          style={{ marginTop: "-4px" }}
        >
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            style={{ accentColor: "#00c853", width: "13px", height: "13px", cursor: "pointer" }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.72rem",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Remember Me
          </span>
        </label>

        {/* Log In button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-bold text-white transition-opacity duration-200 hover:opacity-90 mt-1"
          style={{
            background: "linear-gradient(135deg, #0d4a14 0%, #0a3410 100%)",
            border: "1px solid rgba(0,230,118,0.3)",
            borderRadius: "999px",
            padding: "0.7rem 0",
            fontSize: "0.88rem",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.04em",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            boxShadow: "0 0 18px rgba(0,200,83,0.25)",
          }}
        >
          {isSubmitting ? "Logging in…" : "Log In"}
        </button>

        {/* Forgot Password */}
        <p className="text-center" style={{ paddingTop: "2px" }}>
          <Link
            href="/forgot-password"
            style={{
              color: "#00c853",
              fontSize: "0.72rem",
              fontFamily: "'Inter', sans-serif",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")}
          >
            Forgot Password
          </Link>
        </p>
      </form>
    </div>
  );
}