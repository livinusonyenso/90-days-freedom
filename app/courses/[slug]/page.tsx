"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoursesNavbar from "@/components/CoursesNavbar";
import StarRating from "@/components/StarRating";
import { getCourseDetail, Module } from "@/data/courseDetail";

// ─── Chevron icon ───────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
        flexShrink: 0,
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Check icon ─────────────────────────────────────────────────────────────
function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14532d" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── Clock icon ─────────────────────────────────────────────────────────────
function Clock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
  );
}

// ─── Lock icon ──────────────────────────────────────────────────────────────
function Lock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

// ─── Curriculum accordion ────────────────────────────────────────────────────
function CurriculumModule({ mod, index }: { mod: Module; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
        style={{
          padding: "1rem 1.25rem",
          background: open ? "#f0fdf4" : "#fafafa",
          border: "none",
          cursor: "pointer",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.92rem",
            color: "#111827",
          }}
        >
          {mod.title}
        </span>
        <Chevron open={open} />
      </button>

      {open && (
        <div>
          {mod.lessons.map((lesson, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
              style={{
                padding: "0.7rem 1.25rem",
                borderTop: "1px solid #f3f4f6",
                background: "white",
              }}
            >
              <div className="flex items-center gap-2">
                {lesson.preview ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#14532d">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <Lock />
                )}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.83rem",
                    color: lesson.preview ? "#111827" : "#6b7280",
                  }}
                >
                  {lesson.title}
                  {lesson.preview && (
                    <span
                      style={{
                        marginLeft: "6px",
                        fontSize: "0.7rem",
                        color: "#14532d",
                        fontWeight: 600,
                        background: "#dcfce7",
                        padding: "1px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      Preview
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    color: "#9ca3af",
                  }}
                >
                  {lesson.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const course = getCourseDetail(slug);
  if (!course) notFound();

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <CoursesNavbar />

      {/* ── Hero ── */}
      <div style={{ background: "#063114", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 mb-5"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
          >
            <Link href="/courses" style={{ color: "#86efac", textDecoration: "none" }}>
              Courses
            </Link>
            <span style={{ color: "#4ade80" }}>/</span>
            <span style={{ color: "#dcfce7" }}>{course.category}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left */}
            <div className="flex-1">
              <span
                className="inline-block mb-4 text-white text-xs font-bold px-3 py-1 rounded-md"
                style={{ background: "#14532d", fontFamily: "'Inter', sans-serif" }}
              >
                {course.category}
              </span>
              <h1
                className="font-bold text-white mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  lineHeight: 1.2,
                }}
              >
                {course.title}
              </h1>
              <p
                style={{
                  color: "#d1fae5",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                  lineHeight: 1.7,
                  maxWidth: "580px",
                }}
              >
                {course.subtitle}
              </p>

              {/* Meta */}
              <div
                className="flex flex-wrap items-center gap-4 mt-6"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}
              >
                <div className="flex items-center gap-1.5">
                  <StarRating rating={course.rating} />
                  <span style={{ color: "#fde68a", fontWeight: 700 }}>
                    {course.rating.toFixed(1)}
                  </span>
                  <span style={{ color: "#86efac" }}>
                    ({course.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <span style={{ color: "#86efac" }}>
                  {course.totalLessons} lessons · {course.totalHours}h total
                </span>
                <span style={{ color: "#86efac" }}>{course.level}</span>
                <span style={{ color: "#4ade80" }}>Updated {course.lastUpdated}</span>
              </div>

              {/* Instructor line */}
              <div
                className="flex items-center gap-2 mt-4"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#86efac" }}
              >
                <span>Taught by</span>
                <span style={{ color: "#fde68a", fontWeight: 600 }}>{course.instructor.name}</span>
              </div>
            </div>

            {/* Right: preview card */}
            <div
              className="lg:w-80 xl:w-96 flex-shrink-0"
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                alignSelf: "flex-start",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  height: "180px",
                  background: "linear-gradient(135deg, #0d4a2a, #1a6b3a)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    mixBlendMode: "luminosity",
                    opacity: 0.7,
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(13,75,40,0.45)",
                    mixBlendMode: "multiply",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#14532d" style={{ marginLeft: 2 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CTA body */}
              <div style={{ padding: "1.5rem" }}>
                <Link
                  href="/register"
                  className="block w-full text-center text-white font-bold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: "#14532d",
                    borderRadius: "8px",
                    padding: "0.75rem 0",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    marginBottom: "0.75rem",
                    display: "block",
                  }}
                >
                  Enrol Now — It&apos;s Free
                </Link>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginBottom: "1.25rem",
                  }}
                >
                  30-day money-back guarantee
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {course.whatsIncluded.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8rem",
                        color: "#374151",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left column */}
          <div className="flex-1 min-w-0">

            {/* What You'll Learn */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "#111827",
                  marginBottom: "1.25rem",
                }}
              >
                What You&apos;ll Learn
              </h2>
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  background: "#fafafa",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div style={{ marginTop: "2px", flexShrink: 0 }}>
                        <Check />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.87rem",
                          color: "#374151",
                          lineHeight: 1.55,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Curriculum */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Course Curriculum
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  marginBottom: "1.25rem",
                }}
              >
                {course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} lessons ·{" "}
                {course.totalHours} hours of content
              </p>
              <div className="flex flex-col gap-3">
                {course.curriculum.map((mod, i) => (
                  <CurriculumModule key={i} mod={mod} index={i} />
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "#111827",
                  marginBottom: "1.25rem",
                }}
              >
                Your Instructor
              </h2>
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  background: "white",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "linear-gradient(135deg, #14532d, #166534)",
                    }}
                  >
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#111827",
                        marginBottom: "2px",
                      }}
                    >
                      {course.instructor.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: "#6b7280",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {course.instructor.title}
                    </p>

                    {/* Stats */}
                    <div
                      className="flex flex-wrap gap-4"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#374151" }}
                    >
                      <span>
                        <strong style={{ color: "#111827" }}>{course.instructor.rating}</strong> Rating
                      </span>
                      <span>
                        <strong style={{ color: "#111827" }}>
                          {course.instructor.students.toLocaleString()}
                        </strong>{" "}
                        Students
                      </span>
                      <span>
                        <strong style={{ color: "#111827" }}>{course.instructor.courses}</strong> Courses
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.87rem",
                    color: "#4b5563",
                    lineHeight: 1.7,
                    marginTop: "1.25rem",
                  }}
                >
                  {course.instructor.bio}
                </p>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "#111827",
                  marginBottom: "1.25rem",
                }}
              >
                Student Reviews
              </h2>

              {/* Overall rating bar */}
              <div
                className="flex items-center gap-4 mb-8"
                style={{
                  padding: "1.25rem 1.5rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  background: "#fafafa",
                }}
              >
                <div className="text-center" style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: "3rem",
                      color: "#14532d",
                      lineHeight: 1,
                    }}
                  >
                    {course.rating.toFixed(1)}
                  </div>
                  <StarRating rating={course.rating} />
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginTop: "4px",
                    }}
                  >
                    Course Rating
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <div
                        style={{
                          flex: 1,
                          height: "6px",
                          background: "#e5e7eb",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            background: "#14532d",
                            borderRadius: "3px",
                            width: star === 5 ? "88%" : star === 4 ? "8%" : "2%",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.75rem",
                          color: "#6b7280",
                          flexShrink: 0,
                          width: "16px",
                          textAlign: "right",
                        }}
                      >
                        {star}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual reviews */}
              <div className="flex flex-col gap-5">
                {course.reviews.map((review, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.25rem 1.5rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      background: "white",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "linear-gradient(135deg, #14532d, #166534)",
                        }}
                      >
                        <img
                          src={review.avatar}
                          alt={review.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            color: "#111827",
                          }}
                        >
                          {review.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.75rem",
                              color: "#9ca3af",
                            }}
                          >
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.87rem",
                        color: "#4b5563",
                        lineHeight: 1.65,
                      }}
                    >
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sticky CTA (desktop only, repeats the card) */}
          <div
            className="hidden xl:block flex-shrink-0"
            style={{ width: "320px" }}
          >
            <div
              style={{
                position: "sticky",
                top: "80px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid #e5e7eb",
                  background: "#f0fdf4",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#111827",
                    marginBottom: "0.25rem",
                  }}
                >
                  {course.totalHours} Hours of Content
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    color: "#6b7280",
                  }}
                >
                  {course.totalLessons} lessons · {course.level}
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <Link
                  href="/register"
                  className="block w-full text-center text-white font-bold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: "#14532d",
                    borderRadius: "8px",
                    padding: "0.75rem 0",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    marginBottom: "0.75rem",
                    display: "block",
                  }}
                >
                  Enrol Now — It&apos;s Free
                </Link>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {course.whatsIncluded.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8rem",
                        color: "#374151",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <div style={{ flexShrink: 0, marginTop: "1px" }}>
                        <Check />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ background: "#063114", padding: "3rem 1rem" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Ready to start your journey?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: "#86efac",
              marginBottom: "1.75rem",
              lineHeight: 1.6,
            }}
          >
            Join over {course.instructor.students.toLocaleString()} students already learning with{" "}
            {course.instructor.name}.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center font-bold text-sm text-white transition-opacity hover:opacity-90"
            style={{
              background: "white",
              color: "#14532d",
              borderRadius: "8px",
              padding: "0.8rem 2.5rem",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.02em",
              textDecoration: "none",
            }}
          >
            Enrol Now — It&apos;s Free
          </Link>
        </div>
      </div>
    </div>
  );
}
