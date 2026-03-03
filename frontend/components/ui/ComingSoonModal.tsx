"use client";

import { useEffect } from "react";

interface ComingSoonModalProps {
  pageName: string;
  onClose: () => void;
}

export default function ComingSoonModal({ pageName, onClose }: ComingSoonModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "2.5rem 2rem",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          position: "relative",
          animation: "modal-pop 0.2s ease-out",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "#f3f4f6",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            border: "2px solid #bbf7d0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "1.35rem",
            color: "#111827",
            margin: "0 0 0.5rem",
          }}
        >
          Coming Soon
        </h2>

        {/* Sub-text */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.88rem",
            color: "#6b7280",
            lineHeight: 1.65,
            margin: "0 0 1.75rem",
          }}
        >
          The <strong style={{ color: "#111827" }}>{pageName}</strong> page is currently
          under construction. We&apos;re working hard to bring it to you soon!
        </p>

        {/* CTA */}
        <button
          onClick={onClose}
          style={{
            background: "#14532d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.7rem 2rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            width: "100%",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
