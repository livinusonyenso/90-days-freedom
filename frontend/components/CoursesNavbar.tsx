"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

const NAV_LINKS: { label: string; href?: string }[] = [
  { label: "Hire Talent", href: "/hire-talent" },
  { label: "Job Board", href: "/job-board" },
  { label: "About" },
  { label: "Blog" },
];

export default function CoursesNavbar() {
  const { user, logout } = useUser();
  const [comingSoonPage, setComingSoonPage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change / resize
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleComingSoon = (label: string) => {
    setMenuOpen(false);
    setComingSoonPage(label);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/courses" className="flex items-center gap-2 flex-shrink-0">
              <div
                className="flex flex-col items-center justify-center"
                style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #14532d, #166534)", flexShrink: 0 }}
              >
                <span style={{ color: "white", fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.65rem", lineHeight: 1 }}>90</span>
                <span style={{ color: "white", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.45rem", lineHeight: 1, marginTop: "1px" }}>Days</span>
              </div>
              <span style={{ color: "#166534", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                Courses
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(({ label, href }) =>
                href ? (
                  <Link
                    key={label}
                    href={href}
                    style={{ color: "#374151", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#166534")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#374151")}
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    onClick={() => setComingSoonPage(label)}
                    style={{ background: "none", border: "none", padding: 0, color: "#374151", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#166534")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#374151")}
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            {/* ── Desktop right: Admin + user ── */}
            <div className="hidden md:flex items-center gap-3">
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  style={{ color: "#14532d", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "0.4rem 0.9rem" }}
                >
                  Admin
                </Link>
              )}
              {user && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#6b7280" }}>
                  Hi, {user.name.split(" ")[0]}
                </span>
              )}
              {user ? (
                <button
                  onClick={logout}
                  style={{ background: "white", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "0.5rem 1.2rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#374151", cursor: "pointer", transition: "border-color 0.15s, color 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#14532d"; (e.currentTarget as HTMLButtonElement).style.color = "#14532d"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLButtonElement).style.color = "#374151"; }}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  style={{ background: "#14532d", borderRadius: "8px", padding: "0.6rem 1.4rem", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "white", textDecoration: "none", letterSpacing: "0.01em" }}
                >
                  Get Started
                </Link>
              )}
            </div>

            {/* ── Mobile: hamburger ── */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px" }}
            >
              {menuOpen ? (
                /* X icon */
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              bottom: 0,
              background: "white",
              zIndex: 49,
              overflowY: "auto",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Nav links */}
            <div style={{ padding: "1rem 1.5rem 0.5rem", display: "flex", flexDirection: "column", gap: "2px" }}>
              {NAV_LINKS.map(({ label, href }) =>
                href ? (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: "block", padding: "0.85rem 0.5rem", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem", color: "#111827", textDecoration: "none", borderBottom: "1px solid #f3f4f6" }}
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    onClick={() => handleComingSoon(label)}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "0.85rem 0.5rem", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem", color: "#111827", background: "none", border: "none", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
                  >
                    {label}
                    <span style={{ fontSize: "0.7rem", color: "#9ca3af", marginLeft: "8px", fontWeight: 400 }}>Coming soon</span>
                  </button>
                )
              )}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#e5e7eb", margin: "0.5rem 1.5rem" }} />

            {/* Admin link */}
            {user?.role === "admin" && (
              <div style={{ padding: "0 1.5rem 0.5rem" }}>
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#14532d", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "0.5rem 1rem" }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Admin Dashboard
                </Link>
              </div>
            )}

            {/* User info + actions */}
            <div style={{ padding: "0.75rem 1.5rem 2rem", marginTop: "auto" }}>
              {user ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.75rem", background: "#f9fafb", borderRadius: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "white", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem" }}>
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#111827", margin: 0 }}>{user.name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); logout(); }}
                    style={{ width: "100%", padding: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#374151", background: "white", border: "1.5px solid #e5e7eb", borderRadius: "10px", cursor: "pointer" }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "block", textAlign: "center", padding: "0.85rem", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "white", background: "#14532d", borderRadius: "10px", textDecoration: "none" }}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {comingSoonPage && (
        <ComingSoonModal pageName={comingSoonPage} onClose={() => setComingSoonPage(null)} />
      )}
    </>
  );
}
