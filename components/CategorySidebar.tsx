"use client";

import { categories } from "@/data/courses";

// SVG icons for each category
function CategoryIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    layers: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    gamepad: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <path strokeLinecap="round" d="M6 12h4M8 10v4M15 12h.01M17 10h.01" />
      </svg>
    ),
    briefcase: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    pen: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    megaphone: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    trending: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    truck: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1h3.5l1.5-3V9h-5v7z" />
      </svg>
    ),
    box: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  };
  return icons[icon] ?? null;
}

interface Props {
  activeCategory: string;
  onSelect: (id: string) => void;
}

export default function CategorySidebar({ activeCategory, onSelect }: Props) {
  return (
    <aside style={{ minWidth: "220px", maxWidth: "240px", width: "100%" }}>
      <h2
        className="font-bold mb-4"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "#111827",
          letterSpacing: "0.01em",
        }}
      >
        Course Categories
      </h2>

      <ul className="flex flex-col gap-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat.id)}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                style={{
                  background: isActive ? "#f0fdf4" : "transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  borderLeft: isActive ? "3px solid #14532d" : "3px solid transparent",
                  color: isActive ? "#14532d" : "#374151",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  outline: "none",
                  paddingLeft: "0.75rem",
                }}
              >
                {cat.id === "all" ? (
                  <span
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "4px",
                      background: isActive ? "#14532d" : "#d1d5db",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="flex-shrink-0"
                    style={{ color: isActive ? "#14532d" : "#9ca3af" }}
                  >
                    <CategoryIcon icon={cat.icon} />
                  </span>
                )}
                <span>{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
