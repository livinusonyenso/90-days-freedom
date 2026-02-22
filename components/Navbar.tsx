"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Examples", href: "#examples" },
];

const resourceLinks = [
  { label: "Case Studies", href: "#" },
  { label: "Templates", href: "#" },
  { label: "Community", href: "#" },
];

export default function Navbar() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = navLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#021a05] border-b border-[#0d2e10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* ── Logo Badge ── */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="w-11 h-11 rounded-full bg-[#22c55e] flex flex-col items-center justify-center leading-none select-none">
              <span className="text-white font-bold text-[15px] leading-none">90</span>
              <span className="text-white font-medium text-[9px] leading-none mt-0.5">Days</span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-[#22c55e] font-semibold"
                    : "text-[#c8d6cb] font-normal hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 text-[#c8d6cb] hover:text-white text-sm font-normal transition-colors duration-200"
              >
                Resources
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-[#062b0a] border border-[#0d2e10] rounded-lg shadow-lg overflow-hidden">
                  {resourceLinks.map((r) => (
                    <Link
                      key={r.label}
                      href={r.href}
                      className="block px-4 py-2.5 text-sm text-[#c8d6cb] hover:text-white hover:bg-[#0a3a0e] transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Desktop CTA Buttons ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Register — outlined pill */}
            <Link
              href="/register"
              className="text-sm text-white font-semibold px-4 py-1.5 rounded-full border border-[#22c55e] hover:bg-[rgba(34,197,94,0.1)] transition-colors duration-200"
            >
              Register
            </Link>

            {/* Sign In — text only */}
            <Link
              href="/login"
              className="text-sm text-[#c8d6cb] font-medium px-3 py-1.5 hover:text-white transition-colors duration-200"
            >
              Sign In
            </Link>

            {/* Free Trial — filled green pill */}
            <Link
              href="/register"
              className="text-sm text-white font-bold px-5 py-1.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] transition-colors duration-200"
              style={{ boxShadow: "0 0 12px rgba(34,197,94,0.35)" }}
            >
              Free Trial
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#062b0a] border-t border-[#0d2e10] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`block text-sm py-1 ${
                activeSection === link.href.slice(1) ? "text-[#22c55e] font-semibold" : "text-[#c8d6cb] hover:text-white"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            className="block text-sm text-[#c8d6cb] hover:text-white py-1"
            onClick={() => setMobileOpen(false)}
          >
            Resources
          </Link>

          <div className="pt-3 border-t border-[#0d2e10] flex flex-col gap-3">
            <Link
              href="/register"
              className="text-sm text-white font-semibold px-4 py-2 rounded-full border border-[#22c55e] text-center hover:bg-[rgba(34,197,94,0.1)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-sm text-[#c8d6cb] text-center py-1 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm text-white font-bold px-4 py-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-center transition-colors"
              onClick={() => setMobileOpen(false)}
              style={{ boxShadow: "0 0 12px rgba(34,197,94,0.35)" }}
            >
              Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}