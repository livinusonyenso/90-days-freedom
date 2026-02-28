"use client";

import { CornerRightDown, ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const discordFeatures = [
  "This signifies your access to the community discord.",
  "You will gain access to resources and weekly office hours Sundays 9am–11am EST",
  "1 Consulation Live or X @90fml to jumpstart your business endeavors.",
  "Access to brand and sell your picture on products and services to make you more money!",
];

const autonomyFeatures = [
  "Access to the Discord chat",
  "End to end system ownership design across the organization",
  "Advanced automation and handoff logic between teams",
  "Leadership level dashboards for performance and decision making",
  "Quarterly private system strategy sessions.",
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      style={{ color: "#00e676" }}
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/freedom-system-membership-plans2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(3, 12, 3, 0.55)" }}
      />

      {/* Subtle particle dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(22)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: "2px",
              height: "2px",
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
              background: "#00e676",
              opacity: 0.35,
              boxShadow: "0 0 5px 2px rgba(0,230,118,0.4)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <Reveal direction="up" className="text-center mb-12">
          <h2
            className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            90-Days Freedom System
            <br />
            <span style={{ color: "#ffffff", fontWeight: 500 }}>
              Membership options
            </span>
          </h2>
        </Reveal>

        {/* Cards — Discord is smaller, Autonomy is larger */}
        <RevealGroup delay={0.1} className="flex flex-col md:flex-row gap-5 lg:gap-7 items-end justify-center">

          {/* ── Card 1: Discord Access (smaller) ── */}
          <RevealItem direction="up" className="w-full md:w-[44%]">
          <div
            className="w-full rounded-2xl p-6 flex-shrink-0"
            style={{
              background: "linear-gradient(145deg, #0a1a0d 0%, #081408 100%)",
              border: "1px solid rgba(0,230,118,0.5)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <h3
              className="font-bold text-white text-xl mb-1.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Discord Access
            </h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }} className="mb-5">
              Unlock limitless potential — the future is yours to create.
            </p>

            {/* Price */}
            <div className="flex items-end gap-2 mb-5">
              <span
                className="font-bold text-white"
                style={{ fontSize: "2.75rem", lineHeight: 1, fontFamily: "'Inter', sans-serif" }}
              >
                $49.99
              </span>
              <div className="mb-0.5">
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", lineHeight: 1.3 }}>
                  One-time
                </p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", lineHeight: 1.3 }}>
                  payment
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-7">
              {discordFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5"
                  style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", lineHeight: 1.55 }}
                >
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="https://codewalker.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center font-bold text-sm tracking-wider py-3 px-6 rounded-lg transition-opacity duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #00c853 0%, #00e676 50%, #1de9b6 100%)",
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                boxShadow: "0 0 20px rgba(0,230,118,0.35)",
                textDecoration: "none",
              }}
            >
              Upgrade to Autonomy Layer
            </a>
          </div>
          </RevealItem>

          {/* ── Card 2: Autonomy Layer (larger/featured) ── */}
          <RevealItem direction="up" className="w-full md:w-[52%]">
          <div
            className="w-full flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #00e676 0%, #00c853 40%, #074E1F 100%)",
              boxShadow: "0 0 40px rgba(0,230,118,0.25)",
            }}
          >
            {/* Best Deal header — part of outer green wrapper */}
            <div className="flex items-center justify-center gap-2 py-3 px-4">
              <CornerRightDown className="w-4 h-4 text-white" />
              <span
                className="text-sm font-bold tracking-wide text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Best Deal
              </span>
            </div>

          {/* Inner dark card */}
          <div
            className="rounded-2xl p-7 mx-1 mb-1"
            style={{
              background: "linear-gradient(145deg, #0d3020 0%, #0a2218 50%, #071a07 100%)",
            }}
          >
            <h3
              className="font-bold text-white text-2xl mb-1.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Autonomy Layer
            </h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }} className="mb-5">
              Step up your game with smarter tools and greater power.
            </p>

            {/* Price */}
            <div className="flex items-end gap-2 mb-5">
              <span
                className="font-bold text-white"
                style={{ fontSize: "3.25rem", lineHeight: 1, fontFamily: "'Inter', sans-serif" }}
              >
                $1,999
              </span>
              <div className="mb-0.5">
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", lineHeight: 1.3 }}>
                  One-time
                </p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", lineHeight: 1.3 }}>
                  payment
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {autonomyFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3"
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.55 }}
                >
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="https://codewalker.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full font-bold text-sm tracking-wider py-3.5 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
              style={{
                background: "linear-gradient(90deg, #00c853 0%, #00e676 50%, #1de9b6 100%)",
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                boxShadow: "0 0 28px rgba(0,230,118,0.4)",
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Join Now
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>

            <p
              className="text-center mt-3"
              style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.72rem" }}
            >
              30-days money-back guarantee
            </p>
          </div>
          </div>
          </RevealItem>

        </RevealGroup>
      </div>
    </section>
  );
}