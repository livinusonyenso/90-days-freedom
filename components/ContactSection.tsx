"use client";

import { useState } from "react";
import Link from "next/link";

const subjects = ["General Inquiry", "Technical Support", "Billing", "Partnership"];

export default function ContactSection() {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* ── Contact Us ── */}
      <section id="contact" className="bg-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <h2
              className="font-bold text-3xl sm:text-4xl text-gray-900 mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact Us
            </h2>
            <p className="text-gray-500 text-sm">
              Any question or remarks? Just write us a message!
            </p>
          </div>

          {/* Main container */}
          <div
            className="flex flex-col lg:flex-row rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {/* ── Left: Contact Info Panel ── */}
            <div
              className="lg:w-[38%] flex-shrink-0 relative flex flex-col justify-between overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0d3d1a 0%, #0a2e14 50%, #071f0e 100%)",
                padding: "2rem 2rem 2rem 2rem",
                minHeight: "420px",
              }}
            >
              {/* Text */}
              <div className="relative z-10">
                <h3
                  className="font-bold text-white text-xl mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Contact Information
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }} className="mb-10">
                  Say something to start a live chat!
                </p>

                {/* Contact items */}
                <ul className="space-y-6">
                  {/* Phone */}
                  <li className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">+1012 3456 789</span>
                  </li>

                  {/* Email */}
                  <li className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">demo@gmail.com</span>
                  </li>

                  {/* Address */}
                  <li className="flex items-start gap-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm leading-relaxed">
                      132 Dartmouth Street Boston,<br />
                      Massachusetts 02156 United States
                    </span>
                  </li>
                </ul>
              </div>

              {/* Twitter X link */}
              <div className="relative z-10 mt-10">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter X
                </a>
              </div>

              {/* Decorative circles — bottom right of green panel */}
              <div
                className="absolute"
                style={{ bottom: "-20px", right: "-20px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
              <div
                className="absolute"
                style={{ bottom: "10px", right: "10px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }}
              />
            </div>

            {/* ── Right: Form Panel ── */}
            <div className="lg:w-[62%] bg-white flex flex-col" style={{ padding: "2.5rem 2.5rem" }}>
              {submitted ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "#f0fdf4" }}
                    >
                      <svg className="w-8 h-8" style={{ color: "#16a34a" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-bold text-gray-900 text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Message Sent!
                    </p>
                    <p className="text-gray-500 text-sm mt-1">We'll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  {/* Row 1: First Name / Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-xs font-medium mb-1"
                        style={{ color: "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        className="w-full outline-none py-2 text-sm text-gray-900 placeholder-gray-300 bg-transparent transition-colors"
                        style={{ borderBottom: "1.5px solid #e5e7eb" }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#15803d")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#e5e7eb")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium mb-1"
                        style={{ color: "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        className="w-full outline-none py-2 text-sm text-gray-900 placeholder-gray-300 bg-transparent transition-colors"
                        style={{ borderBottom: "1.5px solid #e5e7eb" }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#15803d")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#e5e7eb")}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email / Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-xs font-medium mb-1"
                        style={{ color: "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full outline-none py-2 text-sm text-gray-900 placeholder-gray-300 bg-transparent transition-colors"
                        style={{ borderBottom: "1.5px solid #e5e7eb" }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#15803d")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#e5e7eb")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium mb-1"
                        style={{ color: "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 012 3456 789"
                        className="w-full outline-none py-2 text-sm text-gray-900 placeholder-gray-300 bg-transparent transition-colors"
                        style={{ borderBottom: "1.5px solid #e5e7eb" }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#15803d")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#e5e7eb")}
                      />
                    </div>
                  </div>

                  {/* Subject radio */}
                  <div>
                    <label
                      className="block text-xs font-medium mb-3"
                      style={{ color: "#374151", fontFamily: "'Inter', sans-serif" }}
                    >
                      Select Subject?
                    </label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {subjects.map((s, i) => (
                        <label
                          key={s}
                          className="flex items-center gap-2 cursor-pointer"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <span
                            className="flex items-center justify-center flex-shrink-0 rounded-full transition-all"
                            style={{
                              width: "14px",
                              height: "14px",
                              border: selectedSubject === i
                                ? "4px solid #15803d"
                                : "1.5px solid #d1d5db",
                              background: "white",
                            }}
                            onClick={() => setSelectedSubject(i)}
                          />
                          <span
                            className="text-sm"
                            style={{ color: selectedSubject === i ? "#111827" : "#6b7280" }}
                            onClick={() => setSelectedSubject(i)}
                          >
                            {s}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs font-medium mb-1"
                      style={{ color: "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      placeholder="Write your message..."
                      rows={3}
                      className="w-full outline-none py-2 text-sm text-gray-900 placeholder-gray-300 bg-transparent transition-colors resize-none"
                      style={{ borderBottom: "1.5px solid #e5e7eb" }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#15803d")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "#e5e7eb")}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="font-bold text-sm tracking-wide text-white px-8 py-3 rounded-lg transition-opacity duration-200 hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #0d3d1a 0%, #0a2e14 100%)",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.03em",
                        boxShadow: "0 2px 12px rgba(13,61,26,0.3)",
                      }}
                    >
                      Send Message
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ready to Get Started CTA ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: "linear-gradient(160deg, #0d3d1a 0%, #0a2e14 50%, #071f0e 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="font-bold text-4xl sm:text-5xl text-white leading-tight mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Ready to get started?
              </h2>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-bold text-sm tracking-widest px-8 py-3.5 rounded-full transition-all duration-200"
                style={{
                  border: "2px solid white",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "white";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#071f0e";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                }}
              >
                KICKSTART YOUR FUTURE
              </Link>
            </div>

            {/* Decorative circle */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  boxShadow: "0 0 60px rgba(0,230,118,0.12)",
                }}
              >
                <div className="text-center p-8">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(0,230,118,0.15)" }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: "#00e676" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-bold text-white text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Your Systems
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>
                    Running Without You
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}