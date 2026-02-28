"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Where to redirect unauthenticated users. Defaults to /login */
  redirectTo?: string;
  /** If true, only admins may access — everyone else is sent to / */
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  adminOnly = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(adminOnly ? "/admin/login" : redirectTo);
      return;
    }

    if (adminOnly && user?.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, adminOnly, user, router, redirectTo]);

  // Show nothing while checking auth or redirecting
  if (isLoading || !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020804",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid #14532d",
            borderTopColor: "#00e676",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (adminOnly && user?.role !== "admin") return null;

  return <>{children}</>;
}
