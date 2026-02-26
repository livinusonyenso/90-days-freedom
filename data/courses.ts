export type CourseLevel = "All Levels" | "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface CourseDetail {
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  totalDuration: string;
  whatYouLearn: { label: string; desc: string }[];
  skills: string[];
  curriculum: Module[];
  reviews: Review[];
  included: string[];
  reviewCount: number;
}

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
  detail: CourseDetail;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const categories: Category[] = [
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

const defaultCurriculum: Module[] = [
  {
    id: "m1",
    title: "Module 1: UIUX Foundations",
    duration: "4.8 m",
    lessons: [
      { id: "l1", title: "Introduction to UI/UX and User-Centered Design", duration: "10 Min" },
      { id: "l2", title: "Understanding UX Research", duration: "15 Min" },
      { id: "l3", title: "Creating User Personas", duration: "20 Min" },
      { id: "l4", title: "Mastering UI Design Principles", duration: "25 Min" },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Wireframing & Prototyping",
    duration: "3.5 m",
    lessons: [
      { id: "l5", title: "Introduction to Wireframing", duration: "12 Min" },
      { id: "l6", title: "Figma Basics", duration: "18 Min" },
      { id: "l7", title: "Building Interactive Prototypes", duration: "22 Min" },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Visual Design",
    duration: "4.2 m",
    lessons: [
      { id: "l8", title: "Color Theory for Designers", duration: "14 Min" },
      { id: "l9", title: "Typography Essentials", duration: "16 Min" },
      { id: "l10", title: "Design Systems & Components", duration: "28 Min" },
    ],
  },
];

const defaultReviews: Review[] = [
  {
    id: "r1",
    name: "Danny",
    role: "Product Manager",
    rating: 5,
    comment: "This course completely changed how I approach design. Highly recommend to anyone looking to level up their UI/UX skills.",
    avatar: "/images/avatar-danny.jpg",
  },
  {
    id: "r2",
    name: "Jessica",
    role: "UX Designer",
    rating: 4,
    comment: "Great content and well-structured modules. The instructor explains complex concepts in a very digestible way.",
    avatar: "/images/avatar-jessica.jpg",
  },
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
    image: "/images/courses1.png",
    slug: "complete-uiux-design-mastery",
    detail: {
      instructor: {
        name: "CODE WALKER",
        role: "Senior UX Designer",
        avatar: "/images/instructor-codewalker.jpg",
      },
      totalDuration: "12h 30m",
      whatYouLearn: [
        { label: "UI/UX Principles:", desc: "Master the fundamentals of user-centered and interaction design." },
        { label: "Wireframing & Prototyping:", desc: "Create effective wireframes and prototypes using Figma." },
        { label: "Visual Design:", desc: "Develop high-converting, visually appealing UI designs." },
        { label: "User Testing:", desc: "Conduct usability testing to refine and optimize your designs." },
      ],
      skills: ["UI/UX Design", "Wireframing & Prototyping", "User Testing"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Downloadable Resources"],
      reviewCount: 315,
    },
  },
  {
    id: "2",
    title: "Unity Game Development Bootcamp",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "game-dev",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/images/courses2.png",
    slug: "unity-game-development-bootcamp",
    detail: {
      instructor: {
        name: "ALEX REED",
        role: "Senior Game Developer",
        avatar: "/images/instructor-alex.jpg",
      },
      totalDuration: "15h 20m",
      whatYouLearn: [
        { label: "Unity Basics:", desc: "Get up and running with the Unity engine and its core features." },
        { label: "C# Scripting:", desc: "Write clean, efficient scripts to power your game logic." },
        { label: "Physics & Animation:", desc: "Implement realistic physics and fluid character animations." },
        { label: "Game Publishing:", desc: "Build and deploy your game to multiple platforms." },
      ],
      skills: ["Unity Engine", "C# Programming", "Game Physics"],
      curriculum: [
        {
          id: "m1",
          title: "Module 1: Unity Foundations",
          duration: "5.2 m",
          lessons: [
            { id: "l1", title: "Introduction to Unity Interface", duration: "12 Min" },
            { id: "l2", title: "GameObjects & Components", duration: "18 Min" },
            { id: "l3", title: "Scenes & Asset Management", duration: "20 Min" },
          ],
        },
        {
          id: "m2",
          title: "Module 2: C# Scripting",
          duration: "6.0 m",
          lessons: [
            { id: "l4", title: "C# Basics for Game Dev", duration: "22 Min" },
            { id: "l5", title: "Player Input & Movement", duration: "25 Min" },
            { id: "l6", title: "Collision & Physics", duration: "20 Min" },
          ],
        },
      ],
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Downloadable Resources", "Source Code Files"],
      reviewCount: 204,
    },
  },
  {
    id: "3",
    title: "Building a Profitable Business Model",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "business",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/images/courses3.png",
    slug: "building-profitable-business-model",
    detail: {
      instructor: {
        name: "SARAH MILES",
        role: "Business Strategist",
        avatar: "/images/instructor-sarah.jpg",
      },
      totalDuration: "10h 45m",
      whatYouLearn: [
        { label: "Business Modeling:", desc: "Design scalable and sustainable business models." },
        { label: "Revenue Streams:", desc: "Identify and build multiple revenue streams." },
        { label: "Market Analysis:", desc: "Conduct deep market research to find profitable niches." },
        { label: "Financial Planning:", desc: "Create financial projections and budgets for your business." },
      ],
      skills: ["Business Strategy", "Revenue Modeling", "Market Research"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Business Templates", "Downloadable Resources"],
      reviewCount: 178,
    },
  },
  {
    id: "4",
    title: "Advanced Facebook Advertising",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "marketing",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/images/courses4.png",
    slug: "advanced-facebook-advertising",
    detail: {
      instructor: {
        name: "MIKE TORRES",
        role: "Digital Marketing Expert",
        avatar: "/images/instructor-mike.jpg",
      },
      totalDuration: "8h 15m",
      whatYouLearn: [
        { label: "Ad Strategy:", desc: "Build data-driven Facebook ad campaigns that convert." },
        { label: "Audience Targeting:", desc: "Master custom and lookalike audiences for precision targeting." },
        { label: "Creative Design:", desc: "Create high-converting ad creatives and copy." },
        { label: "Analytics:", desc: "Read and optimize campaigns using Facebook Ads Manager." },
      ],
      skills: ["Facebook Ads", "Audience Targeting", "Ad Copywriting"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Ad Templates", "Downloadable Resources"],
      reviewCount: 142,
    },
  },
  {
    id: "5",
    title: "Sales Funnel Mastery",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "sales",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/images/courses5.png",
    slug: "sales-funnel-mastery",
    detail: {
      instructor: {
        name: "JAMES COLE",
        role: "Sales Funnel Specialist",
        avatar: "/images/instructor-james.jpg",
      },
      totalDuration: "9h 30m",
      whatYouLearn: [
        { label: "Funnel Architecture:", desc: "Design end-to-end sales funnels that generate revenue." },
        { label: "Lead Generation:", desc: "Build lead magnets and opt-in systems that grow your list." },
        { label: "Email Sequences:", desc: "Write automated email sequences that nurture and convert." },
        { label: "Conversion Optimization:", desc: "A/B test and optimize every step of your funnel." },
      ],
      skills: ["Sales Funnels", "Lead Generation", "Email Marketing"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Funnel Templates", "Downloadable Resources"],
      reviewCount: 256,
    },
  },
  {
    id: "6",
    title: "Brand Identity & Content Strategy",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "branding",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/images/courses6.png",
    slug: "brand-identity-content-strategy",
    detail: {
      instructor: {
        name: "NINA BLAKE",
        role: "Brand Strategist",
        avatar: "/images/instructor-nina.jpg",
      },
      totalDuration: "11h 00m",
      whatYouLearn: [
        { label: "Brand Identity:", desc: "Craft a compelling brand identity that resonates with your audience." },
        { label: "Content Strategy:", desc: "Build a content calendar and distribution strategy." },
        { label: "Visual Branding:", desc: "Design logos, color palettes, and brand guidelines." },
        { label: "Storytelling:", desc: "Use narrative frameworks to communicate your brand story." },
      ],
      skills: ["Brand Strategy", "Content Planning", "Visual Identity"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Brand Kit Templates", "Downloadable Resources"],
      reviewCount: 189,
    },
  },
  {
    id: "7",
    title: "Sales Funnel Mastery",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "sales",
    lessons: 65,
    level: "All Levels",
    rating: 5,
    image: "/images/courses1.png",
    slug: "sales-funnel-mastery-2",
    detail: {
      instructor: {
        name: "JAMES COLE",
        role: "Sales Funnel Specialist",
        avatar: "/images/instructor-james.jpg",
      },
      totalDuration: "9h 30m",
      whatYouLearn: [
        { label: "Funnel Architecture:", desc: "Design end-to-end sales funnels that generate revenue." },
        { label: "Lead Generation:", desc: "Build lead magnets and opt-in systems that grow your list." },
        { label: "Email Sequences:", desc: "Write automated email sequences that nurture and convert." },
        { label: "Conversion Optimization:", desc: "A/B test and optimize every step of your funnel." },
      ],
      skills: ["Sales Funnels", "Lead Generation", "Email Marketing"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Funnel Templates", "Downloadable Resources"],
      reviewCount: 198,
    },
  },
  {
    id: "8",
    title: "Brand Identity & Content Strategy",
    description: "Become a UI/UX pro by mastering the principles of user-centered design.",
    category: "branding",
    lessons: 65,
    level: "All Levels",
    rating: 4,
    image: "/images/courses1.png",
    slug: "brand-identity-content-strategy-2",
    detail: {
      instructor: {
        name: "NINA BLAKE",
        role: "Brand Strategist",
        avatar: "/images/instructor-nina.jpg",
      },
      totalDuration: "11h 00m",
      whatYouLearn: [
        { label: "Brand Identity:", desc: "Craft a compelling brand identity that resonates with your audience." },
        { label: "Content Strategy:", desc: "Build a content calendar and distribution strategy." },
        { label: "Visual Branding:", desc: "Design logos, color palettes, and brand guidelines." },
        { label: "Storytelling:", desc: "Use narrative frameworks to communicate your brand story." },
      ],
      skills: ["Brand Strategy", "Content Planning", "Visual Identity"],
      curriculum: defaultCurriculum,
      reviews: defaultReviews,
      included: ["65 On Demand Lessons", "Brand Kit Templates", "Downloadable Resources"],
      reviewCount: 167,
    },
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