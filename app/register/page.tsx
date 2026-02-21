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
        background: "radial-gradient(ellipse at 50% 40%, #0d3d0d 0%, #050f05 70%)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
          <span className="text-brand-bg font-heading font-bold text-xs">90</span>
        </div>
      </Link>

      {/* Title */}
      <h1 className="font-heading font-bold text-white text-2xl sm:text-3xl tracking-widest uppercase text-center mb-1">
        THE 90-DAY FREEDOM SYSTEM
      </h1>

      {/* Subtitle */}
      <p className="text-brand-green font-heading font-semibold text-xl mb-8 text-center">
        Create Account
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs space-y-4"
      >
        <div>
          <label className="block text-brand-text-muted text-xs mb-1 font-body">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-brand-border rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-green transition-colors placeholder-brand-text-dim"
          />
        </div>

        <div>
          <label className="block text-brand-text-muted text-xs mb-1 font-body">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-brand-border rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-brand-text-muted text-xs mb-1 font-body">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-brand-border rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-brand-text-muted text-xs mb-1 font-body">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-brand-border rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-bg-card border border-brand-border-bright text-white font-heading font-bold text-sm tracking-wider py-3 rounded-full hover:bg-brand-bg-light hover:border-brand-green transition-all duration-200 mt-2"
        >
          Sign Up
        </button>

        <p className="text-center text-brand-text-dim text-xs pt-1">
          Have an Account?{" "}
          <Link
            href="/login"
            className="text-brand-green hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
