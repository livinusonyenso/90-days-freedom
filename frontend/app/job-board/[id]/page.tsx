import { jobs } from "@/data/jobs";
import JobDetailClient from "./JobDetailClient";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JobDetailClient id={id} />;
}
