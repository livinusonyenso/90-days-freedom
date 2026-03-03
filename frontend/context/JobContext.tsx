"use client";

import { createContext, useContext } from "react";
import { jobs, getJob as getJobById, type Job } from "@/data/jobs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApplicationPayload {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

interface JobContextValue {
  /** Full list of job postings */
  jobs: Job[];
  /** Look up a single job by ID */
  getJob: (id: string) => Job | undefined;
  /** Submit a job application — never throws, always returns a result */
  submitApplication: (payload: ApplicationPayload) => Promise<SubmitResult>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const JobContext = createContext<JobContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function JobProvider({ children }: { children: React.ReactNode }) {
  const submitApplication = async (payload: ApplicationPayload): Promise<SubmitResult> => {
    try {
      const res = await fetch(`${API_URL}/job-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Handle HTTP-level errors with friendly messages — never expose raw server text
      if (!res.ok) {
        if (res.status === 422) {
          const data = await res.json().catch(() => ({}));
          const msg =
            (data.errors as { message: string }[] | undefined)
              ?.map((e) => e.message)
              .join(" ") || "Please review your input and try again.";
          return { success: false, message: msg };
        }
        if (res.status >= 500) {
          return {
            success: false,
            message: "Our server is experiencing an issue. Please try again in a moment.",
          };
        }
        return {
          success: false,
          message: "We couldn't process your application right now. Please try again.",
        };
      }

      const data = await res.json();
      return data.success
        ? { success: true, message: "Application submitted successfully!" }
        : {
            success: false,
            message: "We couldn't process your application right now. Please try again.",
          };
    } catch {
      return {
        success: false,
        message: "Unable to submit. Please check your internet connection and try again.",
      };
    }
  };

  return (
    <JobContext.Provider value={{ jobs, getJob: getJobById, submitApplication }}>
      {children}
    </JobContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useJob(): JobContextValue {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJob must be used inside <JobProvider>");
  return ctx;
}
