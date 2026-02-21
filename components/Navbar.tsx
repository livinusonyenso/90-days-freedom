"use client";

import { useState } from "react";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
              <span className="text-brand-bg font-heading font-bold text-xs leading-none">
                90
              </span>
            </div>
            <span className="font-heading font-bold text-white text-sm tracking-wide hidden sm:block">
              90-DAYS FREEDOM
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-brand-text-muted hover:text-white text-sm font-body transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 text-brand-text-muted hover:text-white text-sm font-body transition-colors duration-200"
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
                <div className="absolute top-full left-0 mt-2 w-44 bg-brand-bg-card border border-brand-border rounded-lg shadow-card-dark overflow-hidden">
                  {resourceLinks.map((r) => (
                    <Link
                      key={r.label}
                      href={r.href}
                      className="block px-4 py-2.5 text-sm text-brand-text-muted hover:text-white hover:bg-brand-bg-light transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/register"
              className="text-sm text-brand-text-muted hover:text-white font-body transition-colors"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-sm text-brand-text-muted hover:text-white font-body transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-brand-green text-brand-bg text-sm font-heading font-bold px-5 py-2 rounded hover:bg-brand-green-bright transition-colors duration-200 tracking-wide"
            >
              JOIN NOW
            </Link>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-bg-card border-t border-brand-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-brand-text-muted hover:text-white text-sm py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-brand-border flex flex-col gap-2">
            <Link href="/login" className="text-sm text-brand-text-muted" onClick={() => setMobileOpen(false)}>Sign In</Link>
            <Link
              href="/register"
              className="bg-brand-green text-brand-bg text-sm font-heading font-bold px-4 py-2 rounded text-center"
              onClick={() => setMobileOpen(false)}
            >
              JOIN NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
