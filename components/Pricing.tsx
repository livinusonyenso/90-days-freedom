"use client";

import Link from "next/link";
import { useState } from "react";

const discordFeatures = [
  "This signifies your access to the community discord.",
  "You will gain access to resources and weekly office hours Sundays 9am–11am EST",
  "3 Consultation Live or X @90fml to jumpstart your business endeavors.",
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
    <svg className="w-5 h-5 text-brand-green flex-shrink-0" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Plan = "discord" | "autonomy";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("autonomy");

  const activeStyle = {
    background: "linear-gradient(145deg, #0d3020 0%, #0a2218 50%, #071a07 100%)",
    border: "1px solid rgba(0,230,118,0.3)",
  };

  const inactiveStyle = {
    background: "linear-gradient(145deg, #0a1a0d 0%, #081408 100%)",
    border: "1px solid rgba(255,255,255,0.07)",
  };

  return (
    <section
      id="pricing"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #0d3d0d 0%, #050f05 65%)",
      }}
    >
      {/* Star/particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-brand-green rounded-full opacity-40"
            style={{
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
              boxShadow: "0 0 4px 1px rgba(0,230,118,0.5)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            90-Days Freedom System
            <br />
            <span className="text-brand-text-muted font-semibold">Membership options</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* Card 1 — Discord Access */}
          <div
            className={`relative rounded-2xl p-7 cursor-pointer transition-all duration-300 ${
              selectedPlan === "discord" ? "shadow-green-glow" : "shadow-card-dark"
            }`}
            style={selectedPlan === "discord" ? activeStyle : inactiveStyle}
            onClick={() => setSelectedPlan("discord")}
          >
            {selectedPlan === "discord" && (
              <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-gradient-to-r from-brand-green to-brand-green-teal text-brand-bg text-xs font-heading font-bold px-3 py-1.5 rounded-full">
                Selected
              </div>
            )}

            <h3 className="font-heading font-bold text-white text-2xl mb-2">Discord Access</h3>
            <p className="text-brand-text-muted text-sm mb-6">
              Unlock limitless potential — the future is yours to create.
            </p>

            {/* Price */}
            <div className="flex items-end gap-2 mb-6">
              <span className="font-heading font-bold text-white text-5xl">$49.99</span>
              <div className="mb-1">
                <p className="text-brand-text-dim text-xs leading-none">One-time</p>
                <p className="text-brand-text-dim text-xs leading-none">payment</p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {discordFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-brand-text-muted text-sm leading-relaxed">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
              <Link
                href="/register"
                className="block w-full text-center border border-brand-green text-brand-green font-heading font-bold text-sm tracking-widest py-3 px-6 rounded-lg hover:bg-brand-green hover:text-brand-bg transition-all duration-200"
              >
                Sign Up
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full bg-cta-gradient text-brand-bg font-heading font-bold text-sm tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-green-glow"
              >
                One Free Trial
              </Link>
            </div>
          </div>

          {/* Card 2 — Autonomy Layer */}
          <div
            className={`relative rounded-2xl p-7 cursor-pointer transition-all duration-300 ${
              selectedPlan === "autonomy" ? "shadow-green-glow animate-pulse-green" : "shadow-card-dark"
            }`}
            style={selectedPlan === "autonomy" ? activeStyle : inactiveStyle}
            onClick={() => setSelectedPlan("autonomy")}
          >
            {/* Best Deal badge */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-gradient-to-r from-brand-green to-brand-green-teal text-brand-bg text-xs font-heading font-bold px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Best Deal
            </div>

            <h3 className="font-heading font-bold text-white text-2xl mb-2">Autonomy Layer</h3>
            <p className="text-brand-text-muted text-sm mb-6">
              Step up your game with smarter tools and greater power.
            </p>

            {/* Price */}
            <div className="flex items-end gap-2 mb-6">
              <span className="font-heading font-bold text-white text-5xl">$1,999</span>
              <div className="mb-1">
                <p className="text-brand-text-dim text-xs leading-none">One-time</p>
                <p className="text-brand-text-dim text-xs leading-none">payment</p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {autonomyFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-brand-text-muted text-sm leading-relaxed">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
              <Link
                href="/register"
                className="block w-full text-center border border-brand-green text-brand-green font-heading font-bold text-sm tracking-widest py-3 px-6 rounded-lg hover:bg-brand-green hover:text-brand-bg transition-all duration-200"
              >
                Sign Up
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full bg-cta-gradient text-brand-bg font-heading font-bold text-base tracking-wider py-3.5 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-green-glow"
              >
                One Free Trial
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-center text-brand-text-dim text-xs">
                30-days money-back guarantee
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
