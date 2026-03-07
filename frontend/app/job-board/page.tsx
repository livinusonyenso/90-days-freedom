"use client";

import { useState } from "react";
import Link from "next/link";
import CoursesNavbar from "@/components/CoursesNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TYPE_COLORS, CATEGORY_ICONS, type JobType, type JobCategory } from "@/data/jobs";
import { useJob } from "@/context/JobContext";

const ALL_TYPES: JobType[] = ["Remote", "Hybrid", "Onsite"];
const ALL_CATEGORIES: JobCategory[] = ["Design", "Engineering", "Marketing", "Sales", "Content", "Operations"];

function pluralDays(n: number) {
  return n === 1 ? "1 day ago" : `${n} days ago`;
}

export default function JobBoardPage() {
  const { jobs } = useJob();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<JobType | "All">("All");
  const [activeCategory, setActiveCategory] = useState<JobCategory | "All">("All");

  const filtered = jobs.filter((job) => {
    const matchSearch =
      search.trim() === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "All" || job.type === activeType;
    const matchCat = activeCategory === "All" || job.category === activeCategory;
    return matchSearch && matchType && matchCat;
  });

  return (
    <ProtectedRoute>
      <div style={{ background: "#f9fafb", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
        <CoursesNavbar />

        {/* ── Hero ── */}
        <div className="jb-hero" style={{ background: "linear-gradient(135deg, #063114 0%, #0d4a1e 60%, #14532d 100%)", padding: "3rem 1.5rem 2.5rem" }}>
          <div className="max-w-5xl mx-auto">
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              WE&apos;RE HIRING
            </p>
            <h1 style={{ color: "white", fontWeight: 800, fontSize: "clamp(1.6rem, 5vw, 2.5rem)", margin: "0 0 0.6rem", lineHeight: 1.15 }}>
              Join the 90-Days Freedom Team
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.92rem", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
              Help us build the platform that helps entrepreneurs build self-running businesses. Remote-first, mission-driven, and growing fast.
            </p>

            {/* Search */}
            <div style={{
              marginTop: "1.5rem", background: "white", borderRadius: "10px",
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.6rem 1rem", maxWidth: "460px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2} style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                suppressHydrationWarning
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles, locations…"
                style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "#111827", width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* ── Filters + Content ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6" style={{ paddingTop: "1.75rem", paddingBottom: "4rem" }}>

          {/* Filter row */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {/* Type filters */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {(["All", ...ALL_TYPES] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  style={{
                    border: activeType === t ? "1.5px solid #14532d" : "1.5px solid #e5e7eb",
                    background: activeType === t ? "#14532d" : "white",
                    color: activeType === t ? "white" : "#374151",
                    borderRadius: "20px", padding: "0.3rem 0.85rem",
                    fontFamily: "'Inter', sans-serif", fontSize: "0.78rem",
                    fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category filters */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {(["All", ...ALL_CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  style={{
                    border: activeCategory === c ? "1.5px solid #6b7280" : "1.5px solid #e5e7eb",
                    background: activeCategory === c ? "#111827" : "white",
                    color: activeCategory === c ? "white" : "#374151",
                    borderRadius: "20px", padding: "0.3rem 0.85rem",
                    fontFamily: "'Inter', sans-serif", fontSize: "0.78rem",
                    fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {c === "All" ? "All Roles" : `${CATEGORY_ICONS[c]} ${c}`}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p style={{ fontSize: "0.82rem", color: "#6b7280", marginBottom: "1.25rem", fontWeight: 500 }}>
            {filtered.length} open position{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Job cards */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔍</div>
              <p style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", marginBottom: "0.4rem" }}>No roles found</p>
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map((job) => {
                const typeStyle = TYPE_COLORS[job.type];
                return (
                  <div
                    key={job.id}
                    className="jb-card"
                    style={{
                      background: "white", borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      padding: "1.4rem 1.6rem",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      transition: "box-shadow 0.2s, border-color 0.2s",
                      display: "flex", alignItems: "flex-start", gap: "1rem",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#d1d5db";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb";
                    }}
                  >
                    {/* Company icon */}
                    <div
                      className="jb-card-icon"
                      style={{
                        width: "48px", height: "48px", borderRadius: "10px", flexShrink: 0,
                        background: "linear-gradient(135deg, #063114, #14532d)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.3rem",
                      }}
                    >
                      {CATEGORY_ICONS[job.category]}
                    </div>

                    {/* Main content */}
                    <div style={{ flex: 1, minWidth: 0 }}>

                      {/* Top row: title+company  |  salary+badge+button */}
                      <div className="jb-card-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                        {/* Left: title + meta */}
                        <div style={{ minWidth: 0 }}>
                          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", margin: "0 0 4px", wordBreak: "break-word" }}>
                            {job.title}
                          </h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>{job.company}</span>
                            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#d1d5db", flexShrink: 0 }} />
                            <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>{job.location}</span>
                            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#d1d5db", flexShrink: 0 }} />
                            <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{pluralDays(job.postedDays)}</span>
                          </div>
                        </div>

                        {/* Right: salary + type badge + button */}
                        <div className="jb-card-right" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#14532d", whiteSpace: "nowrap" }}>{job.salary}</span>
                          <span style={{
                            fontSize: "0.72rem", fontWeight: 700, borderRadius: "20px", whiteSpace: "nowrap",
                            padding: "0.2rem 0.65rem", background: typeStyle.bg, color: typeStyle.color,
                          }}>
                            {job.type}
                          </span>
                          <Link
                            href={`/job-board/${job.id}`}
                            className="jb-view-btn"
                            style={{
                              background: "#14532d", color: "white", textDecoration: "none",
                              borderRadius: "8px", padding: "0.45rem 1.1rem",
                              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem",
                              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px",
                              transition: "opacity 0.15s", whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                          >
                            View Job
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* Short desc */}
                      <p style={{ margin: "0.65rem 0 0", fontSize: "0.83rem", color: "#6b7280", lineHeight: 1.65 }}>
                        {job.shortDesc}
                      </p>

                      {/* Category tag */}
                      <div style={{ marginTop: "0.65rem" }}>
                        <span style={{
                          fontSize: "0.72rem", fontWeight: 600, color: "#374151",
                          background: "#f3f4f6", borderRadius: "6px", padding: "0.2rem 0.6rem",
                        }}>
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .jb-hero {
            padding: 2rem 1.25rem 1.75rem !important;
          }
          .jb-card {
            padding: 1rem !important;
            gap: 0.75rem !important;
          }
          .jb-card-icon {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.1rem !important;
            border-radius: 8px !important;
          }
          .jb-card-header {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          .jb-card-right {
            flex-wrap: wrap !important;
            flex-shrink: unset !important;
            width: 100% !important;
          }
          .jb-view-btn {
            width: 100% !important;
            padding: 0.65rem !important;
            font-size: 0.85rem !important;
            border-radius: 10px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
