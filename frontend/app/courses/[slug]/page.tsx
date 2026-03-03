import { courses } from "@/data/courses";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CourseDetailClient slug={slug} />;
}
