"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import CoursesNavbar from "@/components/CoursesNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TYPE_COLORS, CATEGORY_ICONS } from "@/data/jobs";
import { useJob } from "@/context/JobContext";
import { notFound } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2)
    errors.fullName = "Full name must be at least 2 characters.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (data.phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(data.phone))
    errors.phone = "Please enter a valid phone number.";
  if (data.githubUrl && !/^https?:\/\/(www\.)?github\.com\//.test(data.githubUrl))
    errors.githubUrl = "Must be a valid GitHub URL (https://github.com/...)";
  if (data.linkedinUrl && !/^https?:\/\/(www\.)?linkedin\.com\//.test(data.linkedinUrl))
    errors.linkedinUrl = "Must be a valid LinkedIn URL (https://linkedin.com/...)";
  return errors;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
          <span style={{
            width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "1px",
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "#374151", lineHeight: 1.65 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FormField({
  label, name, type = "text", value, placeholder, error, optional, onChange,
}: {
  label: string; name: string; type?: string; value: string;
  placeholder: string; error?: string; optional?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>
        {label}
        {optional && <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: "4px" }}>(optional)</span>}
      </label>
      <input
        suppressHydrationWarning
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "0.6rem 0.85rem",
          border: error ? "1.5px solid #f87171" : "1.5px solid #e5e7eb",
          borderRadius: "8px", fontFamily: "'Inter', sans-serif",
          fontSize: "0.88rem", color: "#111827", outline: "none",
          background: "white", boxSizing: "border-box", transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.target.style.borderColor = error ? "#f87171" : "#14532d")}
        onBlur={(e) => (e.target.style.borderColor = error ? "#f87171" : "#e5e7eb")}
      />
      {error && <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "#ef4444" }}>{error}</p>}
    </div>
  );
}

export default function JobDetailClient({ id }: { id: string }) {
  const { getJob, submitApplication } = useJob();
  const job = getJob(id);
  if (!job) return notFound();

  const typeStyle = TYPE_COLORS[job.type];
  const applyRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "", email: "", phone: "", githubUrl: "", linkedinUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const scrollToApply = () => {
    applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setApiError("");
    setIsSubmitting(true);

    const result = await submitApplication({
      ...formData,
      jobId: job.id,
      jobTitle: job.title,
    });

    if (result.success) {
      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", githubUrl: "", linkedinUrl: "" });
    } else {
      setApiError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <ProtectedRoute>
      <div style={{ background: "#f9fafb", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
        <CoursesNavbar />

        {/* ── Job Hero ── */}
        <div style={{ background: "linear-gradient(135deg, #063114 0%, #0d4a1e 60%, #14532d 100%)", padding: "2.5rem 1.5rem 2rem" }}>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link href="/job-board" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", textDecoration: "none", marginBottom: "1.25rem" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Job Board
            </Link>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
              {/* Icon */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "12px", flexShrink: 0,
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
              }}>
                {CATEGORY_ICONS[job.category]}
              </div>
              <div>
                <h1 style={{ color: "white", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,1.9rem)", margin: "0 0 6px", lineHeight: 1.2 }}>
                  {job.title}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem" }}>{job.company}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem" }}>{job.location}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, borderRadius: "20px", padding: "0.2rem 0.7rem", background: typeStyle.bg, color: typeStyle.color }}>
                    {job.type}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }}>{job.salary}</span>
                </div>
              </div>
            </div>

            {/* Apply CTA */}
            <button
              onClick={scrollToApply}
              style={{
                marginTop: "1.5rem", background: "white", color: "#14532d",
                border: "none", borderRadius: "8px", padding: "0.75rem 2rem",
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.95rem",
                cursor: "pointer", transition: "opacity 0.15s",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              Apply Now →
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
          <div style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* LEFT: Job detail */}
            <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* About the Company */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem" }}>
                <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", margin: "0 0 0.75rem" }}>About the Company</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.87rem", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{job.companyDesc}</p>
              </div>

              {/* About the Role */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem" }}>
                <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", margin: "0 0 0.75rem" }}>About the Role</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.87rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>{job.fullDesc}</p>
              </div>

              {/* Responsibilities */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem" }}>
                <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", margin: "0 0 1rem" }}>Responsibilities</h2>
                <BulletList items={job.responsibilities} />
              </div>

              {/* Requirements */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem" }}>
                <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", margin: "0 0 1rem" }}>Requirements</h2>
                <BulletList items={job.requirements} />
              </div>

              {/* Nice to Have */}
              {job.niceToHave.length > 0 && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "1.5rem" }}>
                  <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#14532d", margin: "0 0 1rem" }}>Nice to Have</h2>
                  <BulletList items={job.niceToHave} />
                </div>
              )}
            </div>

            {/* RIGHT: Sticky info card */}
            <div style={{ width: "220px", flexShrink: 0, position: "sticky", top: "80px" }}>
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", margin: "0 0 0.85rem" }}>JOB OVERVIEW</p>
                {[
                  { icon: "💼", label: "Role", value: job.title },
                  { icon: "🏢", label: "Type", value: job.type },
                  { icon: "📍", label: "Location", value: job.location },
                  { icon: "🏷️", label: "Category", value: job.category },
                  { icon: "💰", label: "Salary", value: job.salary },
                  { icon: "🕒", label: "Posted", value: `${job.postedDays}d ago` },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.7rem" }}>
                    <span style={{ fontSize: "0.95rem", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.7rem", color: "#9ca3af", fontWeight: 600 }}>{label}</p>
                      <p style={{ margin: "1px 0 0", fontSize: "0.8rem", color: "#111827", fontWeight: 600, lineHeight: 1.3 }}>{value}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={scrollToApply}
                  style={{
                    marginTop: "0.5rem", width: "100%", background: "#14532d", color: "white",
                    border: "none", borderRadius: "8px", padding: "0.65rem 0",
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.88rem",
                    cursor: "pointer", transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* ── Application Form ── */}
          <div ref={applyRef} style={{ marginTop: "2.5rem" }}>
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
              {/* Form header */}
              <div style={{ background: "linear-gradient(135deg, #063114 0%, #0d4a1e 100%)", padding: "1.75rem 2rem" }}>
                <h2 style={{ color: "white", fontWeight: 800, fontSize: "1.25rem", margin: "0 0 4px" }}>
                  Apply for {job.title}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", margin: 0 }}>
                  Fill in the form below and we'll be in touch soon.
                </p>
              </div>

              {/* Form body */}
              <div style={{ padding: "2rem" }}>
                {submitted ? (
                  /* ── Success state ── */
                  <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                    <div style={{
                      width: "72px", height: "72px", borderRadius: "50%", background: "#f0fdf4",
                      border: "2px solid #bbf7d0", display: "flex", alignItems: "center",
                      justifyContent: "center", margin: "0 auto 1.25rem",
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#111827", margin: "0 0 0.5rem" }}>
                      Application Submitted!
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.7, margin: "0 0 1.5rem", maxWidth: "380px", marginLeft: "auto", marginRight: "auto" }}>
                      Thanks for applying for <strong style={{ color: "#111827" }}>{job.title}</strong>. We&apos;ve sent a confirmation to your email. Our team will review your application and get back to you within 5–7 business days.
                    </p>
                    <Link
                      href="/job-board"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        background: "#14532d", color: "white", textDecoration: "none",
                        borderRadius: "8px", padding: "0.65rem 1.5rem",
                        fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.88rem",
                      }}
                    >
                      Browse More Jobs
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* API error */}
                    {apiError && (
                      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "0.7rem 1rem", marginBottom: "1.25rem" }}>
                        <p style={{ color: "#ef4444", fontSize: "0.82rem", margin: 0 }}>{apiError}</p>
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Full Name" name="fullName" value={formData.fullName} placeholder="John Doe" error={errors.fullName} onChange={handleChange} />
                        <FormField label="Email Address" name="email" type="email" value={formData.email} placeholder="you@example.com" error={errors.email} onChange={handleChange} />
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Phone Number" name="phone" type="tel" value={formData.phone} placeholder="+1 012 3456 789" error={errors.phone} optional onChange={handleChange} />
                        <FormField label="GitHub URL" name="githubUrl" type="url" value={formData.githubUrl} placeholder="https://github.com/username" error={errors.githubUrl} optional onChange={handleChange} />
                      </div>

                      {/* LinkedIn */}
                      <FormField label="LinkedIn URL" name="linkedinUrl" type="url" value={formData.linkedinUrl} placeholder="https://linkedin.com/in/username" error={errors.linkedinUrl} optional onChange={handleChange} />
                    </div>

                    {/* Submit */}
                    <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          background: isSubmitting ? "#86efac" : "linear-gradient(135deg, #063114, #14532d)",
                          color: "white", border: "none", borderRadius: "8px",
                          padding: "0.75rem 2.25rem", fontFamily: "'Inter', sans-serif",
                          fontWeight: 700, fontSize: "0.95rem", cursor: isSubmitting ? "not-allowed" : "pointer",
                          transition: "opacity 0.15s", display: "flex", alignItems: "center", gap: "8px",
                          boxShadow: "0 2px 12px rgba(20,83,45,0.3)",
                        }}
                        onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; }}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                      >
                        {isSubmitting ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ animation: "spin 1s linear infinite" }}>
                              <path strokeLinecap="round" d="M12 2a10 10 0 1 0 10 10" />
                            </svg>
                            Submitting…
                          </>
                        ) : "Submit Application →"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
