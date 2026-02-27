"use client";

import { useState, useMemo } from "react";
import CategorySidebar from "@/components/CategorySidebar";
import CourseCard from "@/components/CourseCard";
import { courses, CourseLevel } from "@/data/courses";
import CoursesNavbar from "@/components/CoursesNavbar";

const LEVELS: CourseLevel[] = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const PAGE_SIZE = 8;

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>("All Levels");
  const [levelOpen, setLevelOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = [...courses];
    if (activeCategory !== "all") list = list.filter((c) => c.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
    }
    if (selectedLevel !== "All Levels") list = list.filter((c) => c.level === selectedLevel);
    if (sortBy === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "Lessons") list = [...list].sort((a, b) => b.lessons - a.lessons);
    return list;
  }, [activeCategory, searchQuery, selectedLevel, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount > filtered.length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All Levels");
    setSortBy("Default");
    setActiveCategory("all");
  };

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <CoursesNavbar />

      {/* Hero */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "3.5rem", paddingBottom: "2rem" }}
      >
        <h1
          className="font-bold text-gray-900 mb-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            lineHeight: 1.2,
            maxWidth: "620px",
          }}
        >
          Learn in-Demand Skills Taught by Pros
        </h1>
        <p
          style={{
            color: "#4b5563",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            lineHeight: 1.65,
            maxWidth: "560px",
          }}
        >
          Explore step-by-step courses taught by expert instructors to elevate your skills and grow your business.
        </p>
      </div>

      {/* Divider line */}
      <div style={{ borderTop: "1px solid #e5e7eb" }} />

      {/* Main content */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        {/* Sidebar */}
        <div className="hidden lg:block flex-shrink-0" style={{ width: "240px" }}>
          <CategorySidebar
            activeCategory={activeCategory}
            onSelect={(id) => { setActiveCategory(id); setVisibleCount(PAGE_SIZE); }}
          />
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          {/* Filters bar */}
          <div
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            {/* Search */}
            <div
              className="flex items-center gap-2 flex-1"
              style={{
                minWidth: "180px",
                maxWidth: "320px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "0.45rem 0.85rem",
              }}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search for Courses"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "#374151",
                  width: "100%",
                }}
              />
            </div>

            {/* Level dropdown */}
            <div className="relative">
              <button
                onClick={() => { setLevelOpen(!levelOpen); setSortOpen(false); }}
                className="flex items-center gap-2"
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "0.45rem 0.9rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "#374151",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedLevel}
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {levelOpen && (
                <div
                  className="absolute top-full left-0 mt-1 z-30 bg-white rounded-lg overflow-hidden"
                  style={{
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    minWidth: "140px",
                  }}
                >
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setSelectedLevel(l); setLevelOpen(false); setVisibleCount(PAGE_SIZE); }}
                      className="block w-full text-left px-4 py-2.5 transition-colors"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: selectedLevel === l ? "#14532d" : "#374151",
                        background: selectedLevel === l ? "#f0fdf4" : "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "0.45rem 0.9rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              Clear
            </button>

            {/* Sort by */}
            <div className="relative ml-auto">
              <button
                onClick={() => { setSortOpen(!sortOpen); setLevelOpen(false); }}
                className="flex items-center gap-2"
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "0.45rem 0.9rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "#374151",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Sort by: {sortBy}
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sortOpen && (
                <div
                  className="absolute top-full right-0 mt-1 z-30 bg-white rounded-lg overflow-hidden"
                  style={{
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    minWidth: "140px",
                  }}
                >
                  {["Default", "Rating", "Lessons"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSortBy(s); setSortOpen(false); }}
                      className="block w-full text-left px-4 py-2.5 transition-colors"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: sortBy === s ? "#14532d" : "#374151",
                        background: sortBy === s ? "#f0fdf4" : "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Course grid */}
          {visible.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20"
              style={{ color: "#9ca3af", fontFamily: "'Inter', sans-serif" }}
            >
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} className="mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">No courses found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {visible.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {/* View more */}
          <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                style={{
                  background: "white",
                  border: "1.5px dashed #d1d5db",
                  borderRadius: "8px",
                  padding: "0.65rem 2.5rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#9ca3af";
                  (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#d1d5db";
                  (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
                }}
              >
                View more courses...
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}