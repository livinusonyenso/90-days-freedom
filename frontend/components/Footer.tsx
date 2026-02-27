"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* ── CTA Section: white top + curved green bottom ── */}
      <div className="relative bg-white overflow-hidden">

        {/* Green curved section — sits below the white area */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "62%", background: "#063114" }}
        />

        {/* SVG wave: white curves into green */}
        <div
          className="absolute left-0 right-0"
          style={{ bottom: "calc(62% - 2px)", lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "120px" }}
          >
            <path
              d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Content */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "3rem", paddingBottom: "4rem" }}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-0">

            {/* Left: text + button */}
            <div className="lg:w-1/2 flex flex-col items-start justify-center" style={{ paddingBottom: "2rem" }}>
              <h2
                className="font-bold text-white leading-tight mb-8"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  whiteSpace: "nowrap",
                }}
              >
                Ready to get started?
              </h2>
              <Link
                href="/register"
                className="inline-flex items-center font-bold text-xs tracking-widest px-7 py-3 rounded-full transition-all duration-200"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.12em",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "white";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#071a09";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                }}
              >
                KICKSTART YOUR FUTURE
              </Link>
            </div>

            {/* Right: circular image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end lg:pr-4">
              <div
                style={{
                  width: "clamp(260px, 38vw, 420px)",
                  height: "clamp(260px, 38vw, 420px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 20px 70px rgba(0,0,0,0.35), 0 4px 24px rgba(0,0,0,0.25)",
                  border: "4px solid rgba(255,255,255,0.12)",
                  background: "#f3f4f6",
                  flexShrink: 0,
                }}
              >
                {/* 
                  Replace src with your actual image.
                  The screenshot shows a tablet + business card on a desk.
                  Using a placeholder that matches the grey/document aesthetic.
                */}
                <img
                  src="/images/footerimage.png"
                  alt="90 Days Freedom System preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  onError={(e) => {
                    // Fallback: show a styled placeholder if image not found
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement as HTMLDivElement;
                    parent.style.background =
                      "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #e9ebe8 100%)";
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;padding:2rem">
                        <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" stroke-width="1">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <path d="M8 21h8M12 17v4"/>
                        </svg>
                        <span style="color:#9ca3af;font-size:0.72rem;font-family:Inter,sans-serif;text-align:center">Add cta-device-mockup.jpg</span>
                      </div>`;
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div
        style={{
          background: "#063114",
          padding: "1.1rem 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00c853, #00e676)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "#071a09",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    lineHeight: 1.1,
                  }}
                >
                  90
                </span>
                <span
                  style={{
                    color: "#071a09",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.55rem",
                    lineHeight: 1,
                    letterSpacing: "0.03em",
                  }}
                >
                  Days
                </span>
              </div>
            </Link>

            {/* Copyright */}
            <p
              className="text-center"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.72rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              © 2026 Coded_Lang. All Rights Reserved.
            </p>

            {/* Twitter X — outlined pill */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:opacity-80 flex-shrink-0"
              style={{
                border: "1px solid rgba(255,255,255,0.22)",
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.72rem",
                fontFamily: "'Inter', sans-serif",
                padding: "0.3rem 0.85rem",
                borderRadius: "999px",
              }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter X
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}