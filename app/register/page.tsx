"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{
        background: "radial-gradient(ellipse at 50% 35%, #0d4a14 0%, #071a09 45%, #020804 100%)",
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
        Create Account
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
        style={{ maxWidth: "260px" }}
      >
        {/* First name */}
        <div className="flex flex-col gap-1">
          <label
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.75rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            First name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
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

        {/* Last name */}
        <div className="flex flex-col gap-1">
          <label
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.75rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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

        {/* Sign Up button */}
        <button
          type="submit"
          className="w-full font-bold text-white transition-opacity duration-200 hover:opacity-90 mt-1"
          style={{
            background: "linear-gradient(135deg, #0d4a14 0%, #0a3410 100%)",
            border: "1px solid rgba(0,230,118,0.3)",
            borderRadius: "999px",
            padding: "0.7rem 0",
            fontSize: "0.88rem",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: "0 0 18px rgba(0,200,83,0.25)",
          }}
        >
          Sign Up
        </button>

        {/* Log in link */}
        <p
          className="text-center"
          style={{
            fontSize: "0.72rem",
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.4)",
            paddingTop: "2px",
          }}
        >
          Have an Account?{" "}
          <Link
            href="/login"
            style={{ color: "#00c853", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")}
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}