"use client";

import { useState, use } from "react";
import Link from "next/link";
import { courses, categories, categoryLabels, type Module } from "@/data/courses";
import { notFound } from "next/navigation";
import CoursesNavbar from "@/components/CoursesNavbar";

// ─── Shared helpers ────────────────────────────────────────────────────────────

function Stars({ rating, max = 5, size = 14 }: { rating: number; max?: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "1px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#14532d" : "none"}
          stroke={i < Math.round(rating) ? "#14532d" : "#d1d5db"} strokeWidth="1.5"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </span>
  );
}

function GreenCheck({ size = 18 }: { size?: number }) {
  return (
    <span
      style={{
        width: size, height: size, borderRadius: "4px",
        background: "#14532d", display: "inline-flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}



// ─── Sidebar ───────────────────────────────────────────────────────────────────
function CategoryIcon({ icon }: { icon: string }) {
  const map: Record<string, JSX.Element> = {
    layers: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    gamepad: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="6" width="20" height="12" rx="4"/><path strokeLinecap="round" d="M6 12h4M8 10v4M15 12h.01M17 10h.01"/></svg>,
    briefcase: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2"/><path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    pen: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>,
    megaphone: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>,
    trending: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
    truck: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1h3.5l1.5-3V9h-5v7z"/></svg>,
    box: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
  };
  return map[icon] ?? null;
}

function Sidebar({ activeCategoryId }: { activeCategoryId: string }) {
  return (
    <aside style={{ width: "220px", flexShrink: 0 }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#111827", marginBottom: "0.85rem" }}>
        Course Categories
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
        {categories.filter(c => c.id !== "all").map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <li key={cat.id}>
              <Link
                href={`/courses?category=${cat.id}`}
                style={{
                  display: "flex", alignItems: "center", gap: "0.65rem",
                  padding: "0.55rem 0.75rem", borderRadius: "8px",
                  borderLeft: isActive ? "3px solid #14532d" : "3px solid transparent",
                  background: isActive ? "#f0fdf4" : "transparent",
                  color: isActive ? "#14532d" : "#374151",
                  fontFamily: "'Inter',sans-serif", fontSize: "0.83rem",
                  fontWeight: isActive ? 600 : 400, textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ color: isActive ? "#14532d" : "#9ca3af", display: "flex" }}>
                  <CategoryIcon icon={cat.icon} />
                </span>
                {cat.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

// ─── Curriculum Module ─────────────────────────────────────────────────────────
function CurriculumModule({ mod, defaultOpen = false }: { mod: Module; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", marginBottom: "8px" }}>
      {/* Module header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.8rem 1rem", background: open ? "#f0fdf4" : "#f9fafb",
          border: "none", cursor: "pointer", gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <GreenCheck size={18} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#111827" }}>
            {mod.title}
          </span>
          {/* lock icon */}
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
            <rect x="5" y="11" width="14" height="10" rx="2"/>
            <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4"/>
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "#6b7280" }}>{mod.duration}</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={2.5}
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </button>

      {/* Lessons */}
      {open && (
        <div style={{ background: "white" }}>
          {mod.lessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.65rem 1rem 0.65rem 2.5rem",
                borderTop: "1px solid #f3f4f6",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <GreenCheck size={16} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#374151" }}>
                  {lesson.title}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                {/* folder/file icon */}
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "#9ca3af" }}>
                  {lesson.duration}
                </span>
                {/* checkbox */}
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.8}>
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Detail Page ──────────────────────────────────────────────────────────
export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = courses.find((c) => c.slug === slug);
  if (!course) return notFound();

  const { detail } = course;
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">("overview");
  const [expandAll, setExpandAll] = useState(false);
  const categoryLabel = categoryLabels[course.category] ?? course.category;

  return (
    <div style={{ background: "white", minHeight: "100vh", fontFamily: "'Inter',sans-serif" }}>
    
      <CoursesNavbar/>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", marginBottom: "0.6rem" }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          <Link href="/courses" style={{ color: "#14532d", textDecoration: "none", fontWeight: 500 }}>
            {categoryLabel}
          </Link>
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
          <span style={{ color: "#374151" }}>{course.title}</span>
        </div>

        {/* Page title + desc */}
        <h1 style={{ fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#111827", lineHeight: 1.2, marginBottom: "0.5rem" }}>
          {course.title}
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.65, maxWidth: "580px", marginBottom: "1.5rem" }}>
          Explore step-by step courses taught by expert instructors to elevate your skills and grow your business.
        </p>
      </div>

      <div style={{ borderTop: "1px solid #e5e7eb" }} />

      {/* ── 3-Column Layout ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ display: "flex", gap: "1.75rem", paddingTop: "1.75rem", paddingBottom: "4rem", alignItems: "flex-start" }}
      >

        {/* LEFT: Sidebar */}
        <div className="hidden lg:block">
          <Sidebar activeCategoryId={course.category} />
        </div>

        {/* CENTER: main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "180px", maxWidth: "380px", display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.4rem 0.85rem" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
              </svg>
              <input suppressHydrationWarning placeholder="Search for courses..." style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151", width: "100%" }} />
            </div>
            {["All Levels", "Sort by: Most Popular"].map((label, i) => (
              <button key={i} style={{ display: "flex", alignItems: "center", gap: "5px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.4rem 0.85rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151", background: "white", cursor: "pointer" }}>
                {label}
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Video thumbnail */}
          <a href="https://codewalker.gumroad.com/" target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative", borderRadius: "12px", overflow: "hidden", background: "#1f2937", marginBottom: "1rem", textDecoration: "none" }}>
            <div style={{ paddingTop: "52%", position: "relative" }}>
              <img
                src={course.image}
                alt={course.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              {/* Dark overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
              {/* Play button */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#14532d" style={{ marginLeft: "3px" }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* Action buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <a href="https://codewalker.gumroad.com/" target="_blank" rel="noopener noreferrer" style={{ background: "#14532d", color: "white", border: "none", borderRadius: "8px", padding: "0.75rem 0", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "opacity 0.15s", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Enroll Now
            </a>
            <button style={{ background: "white", color: "#374151", border: "1.5px solid #d1d5db", borderRadius: "8px", padding: "0.75rem 0", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>
              Watch Preview
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "1.75rem", borderBottom: "1px solid #e5e7eb", marginBottom: "2rem" }}>
            {(["overview", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: "none", background: "none", cursor: "pointer", padding: "0.6rem 0",
                  fontFamily: "'Inter',sans-serif", fontSize: "0.88rem",
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? "#111827" : "#6b7280",
                  borderBottom: activeTab === tab ? "2.5px solid #14532d" : "2.5px solid transparent",
                  marginBottom: "-1px",
                  textTransform: "capitalize",
                }}
              >
                {tab === "overview" ? "Course Overview" : `Reviews (${detail.reviewCount})`}
              </button>
            ))}
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* What You'll Learn + Skills sidebar */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }}>
                {/* Left: What You'll Learn */}
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#111827", marginBottom: "1.1rem" }}>
                    What You'll Learn
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {detail.whatYouLearn.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <GreenCheck size={20} />
                        <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>
                          <strong style={{ color: "#111827" }}>{item.label}</strong>{" "}{item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Skills You Will Gain */}
                <div style={{ minWidth: "200px", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#111827", letterSpacing: "0.06em", marginBottom: "0.85rem" }}>
                    SKILLS YOU WILL GAIN
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.1rem" }}>
                    {detail.skills.map((skill, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151" }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                  <a href="https://codewalker.gumroad.com/" target="_blank" rel="noopener noreferrer" style={{ width: "100%", background: "#14532d", color: "white", border: "none", borderRadius: "8px", padding: "0.6rem 0", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Enroll Now
                  </a>
                </div>
              </div>

              {/* Course Curriculum */}
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid #e5e7eb", background: "white" }}>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "1rem", color: "#111827", margin: 0 }}>
                    Course Curriculum
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#6b7280" }}>
                      Approx. {detail.totalDuration}
                    </span>
                    <button
                      onClick={() => setExpandAll(!expandAll)}
                      style={{ display: "flex", alignItems: "center", gap: "4px", border: "none", background: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#374151" }}
                    >
                      {/* stacked lines icon */}
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" d="M4 6h16M4 10h16M4 14h16"/>
                      </svg>
                      Expand All
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Modules */}
                <div style={{ padding: "0.75rem" }}>
                  {detail.curriculum.map((mod, idx) => (
                    <CurriculumModule key={mod.id} mod={mod} defaultOpen={idx === 0 || expandAll} />
                  ))}
                </div>
              </div>

              {/* Reviews + What's Included */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }}>
                {/* Left: Reviews */}
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", marginBottom: "1rem" }}>
                    What Our Students Are Saying
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {detail.reviews.map((review) => (
                      <div key={review.id} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,#d1d5db,#9ca3af)", flexShrink: 0, overflow: "hidden" }}>
                          <img src={review.avatar} alt={review.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                            <Stars rating={review.rating} size={13} />
                            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#111827" }}>{review.rating}.0</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#111827" }}>{review.name}</span>
                            <span style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.04em" }}>{review.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: What's Included */}
                <div style={{ minWidth: "210px" }}>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", marginBottom: "1rem" }}>
                    What's Included
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {detail.included.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#374151" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === "reviews" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                  {course.rating}.0
                </span>
                <div>
                  <Stars rating={course.rating} size={18} />
                  <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: "4px 0 0" }}>
                    Based on {detail.reviewCount} reviews
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {detail.reviews.map((review) => (
                  <div key={review.id} style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,#d1d5db,#9ca3af)", flexShrink: 0, overflow: "hidden" }}>
                        <img src={review.avatar} alt={review.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827" }}>{review.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{review.role}</span>
                          <Stars rating={review.rating} size={13} />
                        </div>
                        <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.65 }}>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Instructor & Enroll card */}
        <div style={{ width: "240px", flexShrink: 0, position: "sticky", top: "80px" }}>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
            {/* Instructor */}
            <div style={{ padding: "1.25rem", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,#d1d5db,#9ca3af)", flexShrink: 0, overflow: "hidden" }}>
                  <img src={detail.instructor.avatar} alt={detail.instructor.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#111827", letterSpacing: "0.02em" }}>
                    {detail.instructor.name}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "0.72rem", color: "#6b7280" }}>
                    {detail.instructor.role}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  {/* lessons icon */}
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8"/>
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151" }}>
                    {course.lessons} Lessons
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#374151", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151" }}>
                    {course.level}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151", fontWeight: 600 }}>
                    {course.rating}.8
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>({detail.reviewCount})</span>
                  <Stars rating={course.rating} size={13} />
                </div>
              </div>
            </div>

            {/* Enroll CTA */}
            <div style={{ padding: "1rem 1.25rem" }}>
              <a href="https://codewalker.gumroad.com/" target="_blank" rel="noopener noreferrer" style={{ width: "100%", background: "#14532d", color: "white", border: "none", borderRadius: "8px", padding: "0.8rem 0", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", marginBottom: "0.6rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Enroll Now
              </a>
              <p style={{ textAlign: "center", margin: 0, fontSize: "0.72rem", color: "#9ca3af" }}>
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}