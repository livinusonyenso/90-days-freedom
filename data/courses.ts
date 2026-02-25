export type CourseLevel = "All Levels" | "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  lessons: number;
  level: CourseLevel;
  rating: number;
  image: string;
  slug: string;
}

export const categories = [
  { id: "all", label: "All Courses", icon: "✓" },
  { id: "ui-ux", label: "UI/UX Design", icon: "layers" },
  { id: "game-dev", label: "Game Development", icon: "gamepad" },
  { id: "business", label: "Business Strategy", icon: "briefcase" },
  { id: "branding", label: "Branding & Content", icon: "pen" },
  { id: "marketing", label: "Marketing", icon: "megaphone" },
  { id: "sales", label: "Sales", icon: "trending" },
  { id: "fulfilment", label: "Fulfilment & Operations", icon: "truck" },
  { id: "product", label: "Product Design & Packaging", icon: "box" },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete UI/UX Design Mastery",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "ui-ux",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/courses/uiux.jpg",
    slug: "complete-uiux-design-mastery",
  },
  {
    id: "2",
    title: "Unity Game Development Bootcamp",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "game-dev",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/courses/gamedev.jpg",
    slug: "unity-game-development-bootcamp",
  },
  {
    id: "3",
    title: "Building a Profitable Business Model",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "business",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/courses/business.jpg",
    slug: "building-profitable-business-model",
  },
  {
    id: "4",
    title: "Advanced Facebook Advertising",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "marketing",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/courses/marketing.jpg",
    slug: "advanced-facebook-advertising",
  },
  {
    id: "5",
    title: "Sales Funnel Mastery",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "sales",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/courses/sales.jpg",
    slug: "sales-funnel-mastery",
  },
  {
    id: "6",
    title: "Brand Identity & Content Strategy",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "branding",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/courses/branding.jpg",
    slug: "brand-identity-content-strategy",
  },
  {
    id: "7",
    title: "Sales Funnel Mastery",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "sales",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/courses/sales2.jpg",
    slug: "sales-funnel-mastery-2",
  },
  {
    id: "8",
    title: "Brand Identity & Content Strategy",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "branding",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/courses/branding2.jpg",
    slug: "brand-identity-content-strategy-2",
  },
];

export const categoryColors: Record<string, string> = {
  "ui-ux": "#0d6b3a",
  "game-dev": "#0a5c30",
  "business": "#1a6b3a",
  "branding": "#0d7a42",
  "marketing": "#0d6b4a",
  "sales": "#0d5c3a",
  "fulfilment": "#0a6b30",
  "product": "#166b3a",
  "content-strategy": "#0d6b55",
};

export const categoryLabels: Record<string, string> = {
  "ui-ux": "UI/UX Design",
  "game-dev": "Game Development",
  "business": "Business Strategy",
  "branding": "Branding & Content",
  "marketing": "Marketing",
  "sales": "Sales",
  "fulfilment": "Fulfilment & Operations",
  "product": "Product Design",
  "content-strategy": "Content Strategy",
};
