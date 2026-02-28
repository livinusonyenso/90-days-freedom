"use client";

import Link from "next/link";

export default function CoursesNavbar() {
  return (
    <nav
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "1px solid #e5e7eb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Nav links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #14532d, #166534)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    lineHeight: 1,
                    letterSpacing: "0",
                  }}
                >
                  90<br />
                  <span style={{ fontSize: "0.5rem", fontWeight: 600 }}>Days</span>
                </span>
              </div>
              <span
                style={{
                  color: "#166534",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                Courses
              </span>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-7">
              {["Hire Talent", "About", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  style={{
                    color: "#374151",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#166534")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#374151")}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Get Started */}
          <Link
            href="/register"
            className="hidden sm:inline-flex items-center font-bold text-sm text-white transition-opacity hover:opacity-90"
            style={{
              background: "#14532d",
              borderRadius: "8px",
              padding: "0.6rem 1.4rem",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.01em",
              textDecoration: "none",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
