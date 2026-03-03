import { JobProvider } from "@/context/JobContext";

export default function JobBoardLayout({ children }: { children: React.ReactNode }) {
  return <JobProvider>{children}</JobProvider>;
}
