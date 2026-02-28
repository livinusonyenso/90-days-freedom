"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav style={{ borderBottom: "1px solid #e5e7eb", background: "white" }}>
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between"
        style={{ height: "60px" }}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg,#14532d,#166534)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "white", fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "0.6rem", lineHeight: 1.2, textAlign: "center" }}>
                90<br /><span style={{ fontWeight: 600, fontSize: "0.48rem" }}>Days</span>
              </span>
            </div>
            <span style={{ color: "#374151", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>
              Courses
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "Hire Talent", href: "/hire-talent", active: true },
              { label: "About", href: "/about", active: false },
              { label: "Blog", href: "/blog", active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: item.active ? "#14532d" : "#374151",
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: item.active ? 600 : 500,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/register"
          style={{
            background: "#14532d", color: "white", borderRadius: "8px",
            padding: "0.5rem 1.3rem", fontFamily: "'Inter',sans-serif",
            fontWeight: 700, fontSize: "0.85rem", textDecoration: "none",
          }}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "1px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? "#14532d" : i < rating ? "url(#half)" : "none"}
          stroke={i < rating ? "#14532d" : "#d1d5db"} strokeWidth="1.5">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const professionals = [
  {
    id: 1, name: "Danny Walker", role: "Landing Page & Funnel Expert",
    rating: 3.5, projects: "1-120 Projects",
    bio: "Versaing. Wher themes decor scattering intriguing facets, and you're partner they whenever parameters a partners value.",
    image: "images/danny.png  ",
  },
  {
    id: 2, name: "Jessica Kalama", role: "Brand Designer",
    rating: 5, projects: "88 Projects",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    image: "/images/jessica.png",
  },
  {
    id: 3, name: "Oba Ford", role: "Ad Specialist & Copywriter",
    rating: 5, projects: "199 Projects",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    image: "/images/oba.png",
  },
];

const priceTabs = ["All Categories", "$1500-1k", "$500-1k", "$1k-5k", "$5k-195k", "$635B"];

const services = [
  {
    id: 1, title: "Web Design & Development",
    desc: "Build websites for your portfolios and products.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 2, title: "Sales Funnels & Lead Generation",
    desc: "Automate your processes with SOPs and potent systems.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 3, title: "Branding & Graphic Design",
    desc: "Drive discovery through creative strategy and design.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4, title: "Social Media & Ads",
    desc: "Develop content systems, campaigns & web presentation.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
];

const qualityFeatures = [
  {
    title: "Find Vetted Experts Only",
    desc: "Browse curated selections of pre-vetted freelancers & agencies.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "We Provide Quality Leads",
    desc: "We curate and quality leads to ensure high conversion and satisfaction.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Safe Payments & Support",
    desc: "Fundsecure hold in escrow plus ongoing support for projects.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

// ─── Professional Card ────────────────────────────────────────────────────────
function ProfessionalCard({ pro }: { pro: typeof professionals[0] }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "1.1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        flex: "1 1 0",
        minWidth: "200px",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        {/* Avatar */}
        <div
          style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "linear-gradient(135deg,#d1d5db,#9ca3af)",
            flexShrink: 0, overflow: "hidden",
          }}
        >
          <img
            src={pro.image} alt={pro.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        {/* Info */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>
            {pro.name}
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#6b7280", margin: "1px 0 4px" }}>
            {pro.role}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Stars rating={pro.rating} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: "#9ca3af" }}>
              {pro.projects}
            </span>
          </div>
        </div>
      </div>
      {/* Bio */}
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
        {pro.bio}
      </p>
      {/* CTA */}
      <Link
        href="#"
        style={{
          display: "block", textAlign: "center", background: "#14532d",
          color: "white", borderRadius: "8px", padding: "0.55rem 0",
          fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.8rem",
          textDecoration: "none", marginTop: "auto",
        }}
      >
        View Profile
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HireTalentPage() {
  const [activeTab, setActiveTab] = useState("All Categories");

  return (
    <div style={{ background: "white", minHeight: "100vh", fontFamily: "'Inter',sans-serif" }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6"
          style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {/* Left */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 800,
                fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: "#111827",
                lineHeight: 1.2, marginBottom: "0.85rem",
              }}
            >
              Hire Proven Talent to Grow Your Business
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: "420px" }}>
              Connect with top-rated freelancers and agencies vetted to provide exceptional service and quality results.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/register"
                style={{
                  background: "#14532d", color: "white", borderRadius: "8px",
                  padding: "0.6rem 1.4rem", fontWeight: 700, fontSize: "0.85rem",
                  textDecoration: "none",
                }}
              >
                Get Started
              </Link>
              <Link
                href="#talent"
                style={{
                  background: "white", color: "#374151",
                  border: "1px solid #d1d5db", borderRadius: "8px",
                  padding: "0.6rem 1.2rem", fontWeight: 600, fontSize: "0.85rem",
                  textDecoration: "none", display: "flex", alignItems: "center", gap: "4px",
                }}
              >
                Find Talent
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: illustration placeholder */}
          <div
            className="hidden sm:flex"
            style={{
              flexShrink: 0, width: "clamp(200px,30vw,280px)", height: "clamp(180px,26vw,250px)",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <img
              src="/images/hero-illustration.png"
              alt="Team collaboration"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement as HTMLDivElement;
                parent.style.background = "linear-gradient(135deg,#f0fdf4,#dcfce7)";
                parent.style.borderRadius = "50%";
                parent.innerHTML = `<svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="#14532d" stroke-width="0.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`;
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Feature Highlights ────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6"
          style={{
            paddingTop: "1.75rem", paddingBottom: "1.75rem",
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem",
          }}
        >
          {[
            {
              icon: (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ),
              title: "Pre-Vetted Experts Only",
              desc: "Our selection process ensures quality",
              bg: "#f0fdf4",
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" strokeWidth={1.4} />
                  <circle cx="12" cy="12" r="6" strokeWidth={1.2} strokeDasharray="2 2" />
                </svg>
              ),
              title: "Quality Leads Sourced for Success",
              desc: "Leads that convert and scale your business",
              bg: "#f0fdf4",
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={1.8}>
                  <rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
                </svg>
              ),
              title: "Safe Payment & Escrow System",
              desc: "Secure payments and support",
              bg: "#f0fdf4",
            },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "42px", height: "42px", borderRadius: "10px",
                  background: f.bg, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                  border: "1px solid #bbf7d0",
                }}
              >
                {f.icon}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: "0 0 3px", lineHeight: 1.3 }}>
                  {f.title}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse Top Services ───────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6"
          style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
        >
          <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: "1.25rem", color: "#111827", marginBottom: "1.75rem" }}>
            Browse Top Services
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem" }}>
            {services.map((svc) => (
              <div
                key={svc.id}
                style={{
                  border: "1px solid #e5e7eb", borderRadius: "12px",
                  padding: "1.25rem 1rem", display: "flex", flexDirection: "column",
                  gap: "0.6rem", alignItems: "flex-start",
                  background: "white",
                }}
              >
                <div style={{ color: "#374151" }}>{svc.icon}</div>
                <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827", margin: 0, lineHeight: 1.3 }}>
                  {svc.title}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0, lineHeight: 1.55, flex: 1 }}>
                  {svc.desc}
                </p>
                <Link
                  href="#"
                  style={{
                    display: "inline-block", background: "#14532d", color: "white",
                    borderRadius: "8px", padding: "0.45rem 1rem",
                    fontWeight: 700, fontSize: "0.78rem", textDecoration: "none",
                    marginTop: "0.25rem",
                  }}
                >
                  Find Talent
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recommended Professionals ─────────────────────────────────────── */}
      <section id="talent" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6"
          style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
        >
          <h2 style={{ fontWeight: 800, fontSize: "1.2rem", color: "#111827", marginBottom: "1.1rem" }}>
            Recommended Professionals
          </h2>

          {/* Filter tabs + Sort */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem",
              borderBottom: "1px solid #e5e7eb", paddingBottom: "0.75rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
              {priceTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: "none", cursor: "pointer",
                    padding: "0.3rem 0.75rem", borderRadius: "6px",
                    fontFamily: "'Inter',sans-serif", fontSize: "0.78rem",
                    fontWeight: activeTab === tab ? 700 : 400,
                    color: activeTab === tab ? "#111827" : "#6b7280",
                    background: activeTab === tab ? "#f3f4f6" : "transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span style={{ fontSize: "0.78rem", color: "#374151" }}>
              Sort by: <strong>Best Match</strong>
            </span>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
            {professionals.map((pro) => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Results ───────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6"
          style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
        >
          <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: "1.2rem", color: "#111827", marginBottom: "1.75rem" }}>
            Quality Results from Our Vetted Experts
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
            {qualityFeatures.map((f, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e5e7eb", borderRadius: "12px",
                  padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column",
                  gap: "0.75rem", alignItems: "flex-start", background: "white",
                }}
              >
                <div
                  style={{
                    width: "46px", height: "46px", borderRadius: "50%",
                    background: "#f0fdf4", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0, lineHeight: 1.3 }}>
                  {f.title}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ / Contact ─────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6"
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb", borderRadius: "14px",
              display: "grid", gridTemplateColumns: "1fr auto",
              overflow: "hidden",
            }}
          >
            {/* Left: testimonial */}
            <div style={{ padding: "1.75rem 2rem", borderRight: "1px solid #e5e7eb" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#111827", marginBottom: "1.25rem" }}>
                Have Questions? Find Answers Here
              </h3>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#d1d5db,#9ca3af)",
                    flexShrink: 0, overflow: "hidden",
                  }}
                >
                  <img
                    src="/images/tiana.png" alt="Tiana"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827" }}>
                      Tiana | CTO, Underscore
                    </span>
                    <Stars rating={4} />
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>4.8</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                    "Hiring through this platform completely transformed our marketing strategy. We saw an increase in leads within use a few weeks. Highly recommend."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: contact */}
            <div
              style={{
                padding: "1.75rem 1.75rem", display: "flex", flexDirection: "column",
                gap: "0.75rem", minWidth: "240px",
              }}
            >
              <p style={{ fontWeight: 800, fontSize: "0.85rem", color: "#111827", margin: "0 0 0.25rem", letterSpacing: "0.04em" }}>
                CONTACT US
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span style={{ fontSize: "0.78rem", color: "#374151" }}>contact@coourses.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span style={{ fontSize: "0.78rem", color: "#374151" }}>(585) 123-4567</span>
              </div>
              <button
                style={{
                  background: "#14532d", color: "white", border: "none",
                  borderRadius: "8px", padding: "0.6rem 1.25rem",
                  fontFamily: "'Inter',sans-serif", fontWeight: 700,
                  fontSize: "0.82rem", cursor: "pointer", marginTop: "0.5rem",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                Start Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ padding: "1.25rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}>
          © 2026 Courses. All rights reserved.
        </p>
      </footer>
    </div>
  );
}