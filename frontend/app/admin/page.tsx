"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

// ─── Dashboard content (only rendered when admin) ─────────────────────────────
function AdminDashboardContent() {
  const { user, token, logout } = useUser();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Fetch users ─────────────────────────────────────────────────────────────
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

  // ── Delete user ─────────────────────────────────────────────────────────────
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
      } else {
        showToast(data.message);
      }
    } catch {
      showToast("Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Toggle role ─────────────────────────────────────────────────────────────
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
      } else {
        showToast(data.message);
      }
    } catch {
      showToast("Role update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Inter',sans-serif" }}>

      {/* ── Topbar ── */}
      <header style={{ background: "#063114", padding: "0 1.5rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Logo */}
          <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: "0.58rem", lineHeight: 1 }}>90</span>
              <span style={{ color: "white", fontWeight: 600, fontSize: "0.38rem", lineHeight: 1, marginTop: "1px" }}>Days</span>
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>Admin</span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#86efac", fontSize: "0.82rem" }}>
            {user?.name}
          </span>
          <button
            onClick={logout}
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.4rem 1rem", color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ── Page title ── */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontWeight: 800, fontSize: "1.5rem", color: "#111827", marginBottom: "4px" }}>User Management</h1>
          <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>View, manage roles, and remove users from the platform.</p>
        </div>

        {/* ── Stat cards ── */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
          <StatCard label="Total Users" value={users.length} color="#111827" />
          <StatCard label="Regular Users" value={totalUsers} color="#2563eb" />
          <StatCard label="Admins" value={totalAdmins} color="#14532d" />
        </div>

        {/* ── Table card ── */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>

          {/* Table header / filters */}
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {/* Search */}
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

            {/* Role filter */}
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

          {/* Table */}
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.85rem" }}>
              Loading users…
            </div>
          ) : error ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#ef4444", fontSize: "0.85rem" }}>
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.85rem" }}>
              No users found.
            </div>
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
                      {/* # */}
                      <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#9ca3af" }}>
                        {idx + 1}
                      </td>

                      {/* Name */}
                      <td style={{ padding: "0.8rem 1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ color: "white", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.72rem" }}>
                              {u.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>
                            {u.name} {u.id === user?.id && <span style={{ fontSize: "0.7rem", color: "#14532d", fontWeight: 400 }}>(you)</span>}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#6b7280" }}>
                        {u.email}
                      </td>

                      {/* Role */}
                      <td style={{ padding: "0.8rem 1rem" }}>
                        <RoleBadge role={u.role} />
                      </td>

                      {/* Joined */}
                      <td style={{ padding: "0.8rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                        {new Date(u.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "0.8rem 1rem" }}>
                        {u.id === user?.id ? (
                          <span style={{ fontSize: "0.75rem", color: "#d1d5db" }}>—</span>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {/* Toggle role */}
                            <button
                              onClick={() => handleRoleToggle(u.id, u.role)}
                              disabled={updatingId === u.id}
                              style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: "6px",
                                padding: "0.3rem 0.7rem",
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#374151",
                                background: updatingId === u.id ? "#f9fafb" : "white",
                                cursor: updatingId === u.id ? "not-allowed" : "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {updatingId === u.id ? "…" : u.role === "admin" ? "Make User" : "Make Admin"}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(u.id, u.name)}
                              disabled={deletingId === u.id}
                              style={{
                                border: "1px solid #fecaca",
                                borderRadius: "6px",
                                padding: "0.3rem 0.7rem",
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#ef4444",
                                background: deletingId === u.id ? "#fff5f5" : "white",
                                cursor: deletingId === u.id ? "not-allowed" : "pointer",
                              }}
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

          {/* Footer count */}
          {!loading && !error && (
            <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid #f3f4f6", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#9ca3af" }}>
              Showing {filtered.length} of {users.length} users
            </div>
          )}
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          background: "#14532d",
          color: "white",
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.82rem",
          fontWeight: 600,
          padding: "0.75rem 1.25rem",
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          zIndex: 999,
          animation: "fadeIn 0.2s ease",
        }}>
          {toast}
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
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
