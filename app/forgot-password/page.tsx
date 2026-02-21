"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        Reset Password
      </p>

      {submitted ? (
        <div className="w-full max-w-xs text-center">
          <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white font-heading font-bold text-lg mb-2">Check your email</p>
          <p className="text-brand-text-muted text-sm mb-6">
            If an account exists for {email}, you will receive a password reset link.
          </p>
          <Link href="/login" className="text-brand-green text-sm hover:underline">
            Back to Log In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <p className="text-brand-text-muted text-xs text-center mb-2">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          <div>
            <label className="block text-brand-text-muted text-xs mb-1 font-body">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-brand-border rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-green transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-bg-card border border-brand-border-bright text-white font-heading font-bold text-sm tracking-wider py-3 rounded-full hover:bg-brand-bg-light hover:border-brand-green transition-all duration-200"
          >
            Send Reset Link
          </button>

          <p className="text-center text-brand-text-dim text-xs pt-1">
            <Link href="/login" className="text-brand-green hover:underline">
              Back to Log In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
