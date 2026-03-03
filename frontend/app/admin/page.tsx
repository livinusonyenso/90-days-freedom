"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

interface JobApplication {
  id: number;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  status: "new" | "reviewing" | "interviewed" | "rejected" | "hired";
  created_at: string;
}

type Tab = "users" | "jobs";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem 1.5rem", flex: 1, minWidth: "140px" }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#9ca3af", marginBottom: "0.4rem", fontWeight: 500 }}>{label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.8rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
    </div>
  );
}

// ─── Role Badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: "user" | "admin" }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "'Inter',sans-serif",
      fontSize: "0.72rem",
      fontWeight: 700,
      padding: "2px 10px",
      borderRadius: "999px",
      background: role === "admin" ? "#dcfce7" : "#f3f4f6",
      color: role === "admin" ? "#14532d" : "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}>
      {role}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<JobApplication["status"], { bg: string; color: string }> = {
  new:        { bg: "#dbeafe", color: "#1d4ed8" },
  reviewing:  { bg: "#fef9c3", color: "#854d0e" },
  interviewed:{ bg: "#ede9fe", color: "#5b21b6" },
  rejected:   { bg: "#fee2e2", color: "#b91c1c" },
  hired:      { bg: "#dcfce7", color: "#14532d" },
};

function StatusBadge({ status }: { status: JobApplication["status"] }) {
  const s = STATUS_STYLES[status];
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "'Inter',sans-serif",
      fontSize: "0.72rem",
      fontWeight: 700,
      padding: "2px 10px",
      borderRadius: "999px",
      background: s.bg,
      color: s.color,
      textTransform: "capitalize",
      letterSpacing: "0.03em",
    }}>
      {status}
    </span>
  );
}

// ─── Application Preview Modal ────────────────────────────────────────────────
function ApplicationModal({
  app,
  token,
  onClose,
  onStatusChange,
}: {
  app: JobApplication;
  token: string | null;
  onClose: () => void;
  onStatusChange: (id: number, status: JobApplication["status"]) => void;
}) {
  const [updating, setUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(app.status);
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleStatus = async (newStatus: JobApplication["status"]) => {
    if (newStatus === currentStatus) return;
    setUpdating(true);
    setStatusError("");
    try {
      const res = await fetch(`${API_URL}/admin/job-applications/${app.id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentStatus(newStatus);
        onStatusChange(app.id, newStatus);
      } else if (res.status === 401) {
        setStatusError("Session expired. Please sign out and log in again.");
      } else {
        setStatusError(data.message || "Failed to update status.");
      }
    } catch {
      setStatusError("Network error. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const statuses: JobApplication["status"][] = ["new", "reviewing", "interviewed", "rejected", "hired"];

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "white", borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", animation: "modalIn 0.2s ease" }}
      >
        {/* Header */}
        <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px", fontWeight: 500 }}>Application for</p>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.15rem", fontWeight: 800, color: "#111827", margin: 0 }}>{app.job_title}</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#6b7280", marginTop: "4px" }}>
              Applied {new Date(app.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: "#f3f4f6", border: "none", borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {/* Applicant info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <InfoField label="Full Name" value={app.full_name} />
            <InfoField label="Email" value={app.email} link={`mailto:${app.email}`} />
            <InfoField label="Phone" value={app.phone || "—"} link={app.phone ? `tel:${app.phone}` : undefined} />
            <InfoField label="Job ID" value={app.job_id} />
            {app.github_url && <InfoField label="GitHub" value="View Profile" link={app.github_url} />}
            {app.linkedin_url && <InfoField label="LinkedIn" value="View Profile" link={app.linkedin_url} />}
          </div>

          {/* Status update */}
          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.25rem" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#374151", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Update Status
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {statuses.map((s) => {
                const style = STATUS_STYLES[s];
                const isActive = currentStatus === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleStatus(s)}
                    disabled={updating}
                    style={{
                      border: `2px solid ${isActive ? style.color : "#e5e7eb"}`,
                      borderRadius: "8px",
                      padding: "0.4rem 0.9rem",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      background: isActive ? style.bg : "white",
                      color: isActive ? style.color : "#6b7280",
                      cursor: updating ? "not-allowed" : "pointer",
                      textTransform: "capitalize",
                      opacity: updating ? 0.6 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {statusError && (
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#ef4444", marginTop: "0.75rem", fontWeight: 500 }}>
                {statusError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</p>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#2563eb", textDecoration: "none" }}>
          {value}
        </a>
      ) : (
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#111827", margin: 0 }}>{value}</p>
      )}
    </div>
  );
}

// ─── Job Applications Tab ─────────────────────────────────────────────────────
function JobApplicationsTab() {
  const { token } = useUser();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | JobApplication["status"]>("all");
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/admin/job-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.status === 401) {
        setError("Session expired or invalid. Please sign out and log in again.");
      } else if (data.success) {
        setApplications(data.applications);
      } else {
        setError(data.message || "Failed to load applications.");
      }
    } catch {
      setError("Failed to load applications. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const handleStatusChange = (id: number, newStatus: JobApplication["status"]) => {
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status: newStatus } : null);
    showToast(`Status updated to "${newStatus}".`);
  };

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = a.full_name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.job_title.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses: ("all" | JobApplication["status"])[] = ["all", "new", "reviewing", "interviewed", "rejected", "hired"];

  return (
    <>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem", color: "#111827", marginBottom: "4px" }}>Job Applications</h1>
        <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>Review, update status, and manage all applicants.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
        <StatCard label="Total" value={applications.length} color="#111827" />
        <StatCard label="New" value={applications.filter((a) => a.status === "new").length} color="#1d4ed8" />
        <StatCard label="Reviewing" value={applications.filter((a) => a.status === "reviewing").length} color="#854d0e" />
        <StatCard label="Hired" value={applications.filter((a) => a.status === "hired").length} color="#14532d" />
      </div>

      {/* Table card */}
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        {/* Filters */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "180px", display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              suppressHydrationWarning
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, job…"
              style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#374151", width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  border: `1px solid ${statusFilter === s ? "#14532d" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  padding: "0.4rem 0.85rem",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: statusFilter === s ? 700 : 400,
                  color: statusFilter === s ? "#14532d" : "#6b7280",
                  background: statusFilter === s ? "#f0fdf4" : "white",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>

          <button
            onClick={fetchApplications}
            style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.4rem 0.85rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151", background: "white", cursor: "pointer" }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.85rem" }}>Loading applications…</div>
        ) : error ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#ef4444", fontSize: "0.85rem" }}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.85rem" }}>No applications found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                  {["#", "Applicant", "Job", "Contact", "Status", "Applied", ""].map((h) => (
                    <th key={h} style={{ padding: "0.7rem 1rem", textAlign: "left", fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, idx) => (
                  <tr
                    key={a.id}
                    style={{ borderBottom: "1px solid #f3f4f6", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#9ca3af" }}>{idx + 1}</td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "white", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.72rem" }}>
                            {a.full_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#111827", margin: 0 }}>{a.full_name}</p>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 500, color: "#374151", margin: 0 }}>{a.job_title}</p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#9ca3af", margin: 0 }}>ID: {a.job_id}</p>
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>
                      {a.phone || "—"}
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <StatusBadge status={a.status} />
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                      {new Date(a.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <button
                        onClick={() => setSelected(a)}
                        style={{
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          padding: "0.3rem 0.85rem",
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#374151",
                          background: "white",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && (
          <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid #f3f4f6", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#9ca3af" }}>
            Showing {filtered.length} of {applications.length} applications
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", background: "#14532d", color: "white", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600, padding: "0.75rem 1.25rem", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 999, animation: "fadeIn 0.2s ease" }}>
          {toast}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <ApplicationModal
          app={selected}
          token={token}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab() {
  const { user, token } = useUser();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
      else setError(data.message);
    } catch {
      setError("Failed to load users. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        showToast(`${name} deleted successfully.`);
      } else showToast(data.message);
    } catch { showToast("Delete failed."); }
    finally { setDeletingId(null); }
  };

  const handleRoleToggle = async (id: number, currentRole: "user" | "admin") => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: newRole } : u));
        showToast(`Role updated to "${newRole}".`);
      } else showToast(data.message);
    } catch { showToast("Role update failed."); }
    finally { setUpdatingId(null); }
  };

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem", color: "#111827", marginBottom: "4px" }}>User Management</h1>
        <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>View, manage roles, and remove users from the platform.</p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
        <StatCard label="Total Users" value={users.length} color="#111827" />
        <StatCard label="Regular Users" value={users.filter((u) => u.role === "user").length} color="#2563eb" />
        <StatCard label="Admins" value={users.filter((u) => u.role === "admin").length} color="#14532d" />
      </div>

      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "180px", display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              suppressHydrationWarning
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#374151", width: "100%" }}
            />
          </div>

          {(["all", "user", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{
                border: `1px solid ${roleFilter === r ? "#14532d" : "#e5e7eb"}`,
                borderRadius: "8px",
                padding: "0.4rem 0.85rem",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.8rem",
                fontWeight: roleFilter === r ? 700 : 400,
                color: roleFilter === r ? "#14532d" : "#6b7280",
                background: roleFilter === r ? "#f0fdf4" : "white",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {r === "all" ? "All" : r}
            </button>
          ))}

          <button
            onClick={fetchUsers}
            style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.4rem 0.85rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#374151", background: "white", cursor: "pointer" }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.85rem" }}>Loading users…</div>
        ) : error ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#ef4444", fontSize: "0.85rem" }}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.85rem" }}>No users found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                  {["#", "Name", "Email", "Role", "Joined", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "0.7rem 1rem", textAlign: "left", fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, idx) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#9ca3af" }}>{idx + 1}</td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "white", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.72rem" }}>{u.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>
                          {u.name} {u.id === user?.id && <span style={{ fontSize: "0.7rem", color: "#14532d", fontWeight: 400 }}>(you)</span>}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#6b7280" }}>{u.email}</td>
                    <td style={{ padding: "0.8rem 1rem" }}><RoleBadge role={u.role} /></td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                      {new Date(u.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      {u.id === user?.id ? (
                        <span style={{ fontSize: "0.75rem", color: "#d1d5db" }}>—</span>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <button
                            onClick={() => handleRoleToggle(u.id, u.role)}
                            disabled={updatingId === u.id}
                            style={{ border: "1px solid #e5e7eb", borderRadius: "6px", padding: "0.3rem 0.7rem", fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#374151", background: updatingId === u.id ? "#f9fafb" : "white", cursor: updatingId === u.id ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
                          >
                            {updatingId === u.id ? "…" : u.role === "admin" ? "Make User" : "Make Admin"}
                          </button>
                          <button
                            onClick={() => handleDelete(u.id, u.name)}
                            disabled={deletingId === u.id}
                            style={{ border: "1px solid #fecaca", borderRadius: "6px", padding: "0.3rem 0.7rem", fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#ef4444", background: deletingId === u.id ? "#fff5f5" : "white", cursor: deletingId === u.id ? "not-allowed" : "pointer" }}
                          >
                            {deletingId === u.id ? "…" : "Delete"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && (
          <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid #f3f4f6", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#9ca3af" }}>
            Showing {filtered.length} of {users.length} users
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", background: "#14532d", color: "white", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600, padding: "0.75rem 1.25rem", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 999, animation: "fadeIn 0.2s ease" }}>
          {toast}
        </div>
      )}
    </>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function AdminDashboardContent() {
  const { user, logout } = useUser();
  const [tab, setTab] = useState<Tab>("users");

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Inter',sans-serif" }}>

      {/* ── Topbar ── */}
      <header style={{ background: "#063114", padding: "0 1.5rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Logo */}
          <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: "0.58rem", lineHeight: 1 }}>90</span>
              <span style={{ color: "white", fontWeight: 600, fontSize: "0.38rem", lineHeight: 1, marginTop: "1px" }}>Days</span>
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>Admin</span>
          </Link>

          {/* Tab switcher */}
          <div style={{ display: "flex", gap: "4px" }}>
            {([
              { key: "users", label: "Users" },
              { key: "jobs", label: "Job Applications" },
            ] as { key: Tab; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.4rem 0.9rem",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  background: tab === key ? "rgba(255,255,255,0.15)" : "transparent",
                  color: tab === key ? "white" : "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#86efac", fontSize: "0.82rem" }}>{user?.name}</span>
          <button
            onClick={logout}
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.4rem 1rem", color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {tab === "users" ? <UsersTab /> : <JobApplicationsTab />}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
