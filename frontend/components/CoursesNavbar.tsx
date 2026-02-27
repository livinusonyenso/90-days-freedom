"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function CoursesNavbar() {
  const { user, logout } = useUser();

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
            <Link href="/courses" className="flex items-center gap-2 flex-shrink-0">
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #14532d, #166534)",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "white", fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.65rem", lineHeight: 1 }}>
                  90
                </span>
                <span style={{ color: "white", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.45rem", lineHeight: 1, marginTop: "1px" }}>
                  Days
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

          {/* Right: user info + Sign Out OR Get Started */}
          <div className="hidden sm:flex items-center gap-3">
            {user && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "#6b7280",
                }}
              >
                Hi, {user.name.split(" ")[0]}
              </span>
            )}
            {user ? (
              <button
                onClick={logout}
                style={{
                  background: "white",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "0.5rem 1.2rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#374151",
                  cursor: "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#14532d";
                  (e.currentTarget as HTMLButtonElement).style.color = "#14532d";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
                  (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                }}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center font-bold text-sm text-white transition-opacity hover:opacity-90"
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
