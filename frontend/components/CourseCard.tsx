import Link from "next/link";
import { Course, categoryLabels } from "../data/courses";
import StarRating from "./StarRating";

// Placeholder gradient backgrounds for when real images aren't available
const placeholderGradients: Record<string, string> = {
  "ui-ux": "linear-gradient(135deg, #0d4a2a 0%, #1a6b3a 50%, #0a7a50 100%)",
  "game-dev": "linear-gradient(135deg, #1a3d0d 0%, #2a5e1a 50%, #1a4a0d 100%)",
  "business": "linear-gradient(135deg, #1a3d2a 0%, #0d5c3a 50%, #1a4a2a 100%)",
  "branding": "linear-gradient(135deg, #0d3d2a 0%, #1a5e3a 50%, #0d4a2a 100%)",
  "marketing": "linear-gradient(135deg, #0d3d3a 0%, #1a5c4a 50%, #0d4a3a 100%)",
  "sales": "linear-gradient(135deg, #1a3d1a 0%, #2a5c2a 50%, #1a4a1a 100%)",
  "fulfilment": "linear-gradient(135deg, #0d2a3d 0%, #1a4a5c 50%, #0d3a4a 100%)",
  "product": "linear-gradient(135deg, #2a1a3d 0%, #3d2a5c 50%, #2a1a4a 100%)",
  "content-strategy": "linear-gradient(135deg, #0d3a3d 0%, #1a5a5c 50%, #0d4a4a 100%)",
};

export default function CourseCard({ course }: { course: Course }) {
  const label = categoryLabels[course.category] ?? course.category;
  const bg = placeholderGradients[course.category] ?? placeholderGradients["ui-ux"];

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.13)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full"
        style={{ height: "160px", background: bg, overflow: "hidden" }}
      >
        {/* Real image (with green overlay) */}
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "luminosity", opacity: 0.7 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        {/* Green tint overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,75,40,0.45)", mixBlendMode: "multiply" }}
        />
        {/* Play button */}
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#14532d"
              style={{ marginLeft: "2px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category badge */}
        <span
          className="inline-block self-start text-white text-xs font-bold px-3 py-1 rounded-md"
          style={{
            background: "#14532d",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </span>

        {/* Title */}
        <h3
          className="font-bold text-gray-900 leading-snug"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.35,
          }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.78rem",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.5,
          }}
        >
          {course.description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center gap-2 flex-wrap mt-auto pt-1"
          style={{
            color: "#374151",
            fontSize: "0.78rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span className="font-semibold" style={{ color: "#111827" }}>
            {course.lessons} Lessons
          </span>
          <span style={{ color: "#d1d5db" }}>|</span>
          <span style={{ color: "#6b7280" }}>{course.level}</span>
          <StarRating rating={course.rating} />
        </div>

        {/* CTA */}
        <Link
          href={`/courses/${course.slug}`}
          className="block w-full text-center text-white font-bold text-sm mt-2 transition-opacity hover:opacity-90"
          style={{
            background: "#14532d",
            borderRadius: "8px",
            padding: "0.6rem 0",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.02em",
            textDecoration: "none",
          }}
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
