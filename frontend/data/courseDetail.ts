export interface Lesson {
  title: string;
  duration: string;
  preview?: boolean;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Review {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Instructor {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  courses: number;
  students: number;
  rating: number;
}

export interface CourseDetail {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  totalLessons: number;
  totalHours: string;
  rating: number;
  reviewCount: number;
  lastUpdated: string;
  image: string;
  whatYouLearn: string[];
  curriculum: Module[];
  instructor: Instructor;
  reviews: Review[];
  whatsIncluded: string[];
}

export const courseDetails: CourseDetail[] = [
  {
    slug: "complete-uiux-design-mastery",
    title: "Complete UI/UX Design Mastery",
    subtitle:
      "Go from zero to job-ready UI/UX designer. Learn research, wireframing, prototyping, and design systems used by top product teams at Google, Airbnb, and beyond.",
    category: "UI/UX Design",
    level: "All Levels",
    totalLessons: 65,
    totalHours: "18.5",
    rating: 5.0,
    reviewCount: 1284,
    lastUpdated: "January 2026",
    image: "/images/courses1.png",
    whatYouLearn: [
      "Master Figma from scratch — components, auto-layout, variants, and design tokens",
      "Conduct user research, build personas, and create journey maps that drive real decisions",
      "Design low-to-high fidelity wireframes and interactive prototypes that impress stakeholders",
      "Build and document a professional design system from scratch",
      "Apply accessibility standards (WCAG 2.1) to create inclusive, compliant interfaces",
      "Present your portfolio confidently and land your first UI/UX role or client project",
    ],
    curriculum: [
      {
        title: "Module 1: Foundations of User-Centered Design",
        lessons: [
          { title: "Welcome & Course Overview", duration: "4:22", preview: true },
          { title: "What Is UI/UX? Roles, Responsibilities & Career Paths", duration: "12:48", preview: true },
          { title: "The Design Thinking Framework Explained", duration: "18:10" },
          { title: "Setting Up Your Figma Workspace", duration: "9:35" },
          { title: "User Research Methods: Interviews, Surveys & Observation", duration: "22:14" },
          { title: "Building Personas and Empathy Maps", duration: "16:50" },
        ],
      },
      {
        title: "Module 2: Wireframing, Prototyping & Design Systems",
        lessons: [
          { title: "From Sketches to Low-Fidelity Wireframes", duration: "20:05" },
          { title: "Designing High-Fidelity Screens in Figma", duration: "28:42" },
          { title: "Creating Interactive Prototypes with Smart Animate", duration: "24:18" },
          { title: "Building a Scalable Design System", duration: "31:55" },
          { title: "Usability Testing: How to Run & Analyse Sessions", duration: "19:30" },
          { title: "Presenting Your Work & Building Your Portfolio", duration: "15:00" },
        ],
      },
    ],
    instructor: {
      name: "Amara Osei",
      title: "Senior Product Designer · Ex-Google, Figma Advocate",
      avatar: "/images/instructor-amara.png",
      bio:
        "Amara is a Senior Product Designer with 9+ years of experience shipping products used by millions. She led design at two Y-Combinator startups before joining Google's Material Design team. A Figma Community Advocate and UX mentor, she has helped over 12,000 students break into product design through clear, project-based teaching.",
      courses: 4,
      students: 12400,
      rating: 4.9,
    },
    reviews: [
      {
        name: "Temi A.",
        avatar: "/images/Tiana.png",
        rating: 5,
        date: "December 2025",
        comment:
          "This course completely changed how I approach design. Amara explains every concept with such clarity. Within 8 weeks I had a portfolio and landed my first freelance client. 10/10 would recommend to anyone serious about UI/UX.",
      },
      {
        name: "Daniel K.",
        avatar: "/images/Danny.png",
        rating: 5,
        date: "November 2025",
        comment:
          "I tried three other design courses before this one. Nothing compares. The design systems module alone is worth the price — it's exactly what real teams use. I got hired as a junior designer 2 months after finishing.",
      },
      {
        name: "Jessica M.",
        avatar: "/images/Jessica.png",
        rating: 5,
        date: "October 2025",
        comment:
          "The curriculum is incredibly well-structured. I love how every lesson builds on the last. Amara's feedback style in the walkthroughs made me feel like I had a personal mentor. My confidence as a designer has skyrocketed.",
      },
    ],
    whatsIncluded: [
      "65 on-demand HD video lessons (18.5 hours of content)",
      "Downloadable Figma source files for every project",
      "Real-world design briefs and hands-on assignments",
      "Certificate of completion to showcase on LinkedIn",
      "Lifetime access with all future course updates included",
    ],
  },
  {
    slug: "unity-game-development-bootcamp",
    title: "Unity Game Development Bootcamp",
    subtitle:
      "Build and ship your first 2D and 3D games using Unity and C#. From game mechanics to publishing on Steam and mobile stores — everything you need in one course.",
    category: "Game Development",
    level: "All Levels",
    totalLessons: 65,
    totalHours: "22.0",
    rating: 4.0,
    reviewCount: 876,
    lastUpdated: "January 2026",
    image: "/images/courses2.png",
    whatYouLearn: [
      "Write clean, efficient C# code for game logic and player interactions",
      "Build complete 2D platformer and 3D third-person games from scratch",
      "Implement physics, animations, and particle systems using Unity's toolkit",
      "Design levels that are fun, balanced, and keep players engaged",
      "Optimise game performance for desktop and mobile targets",
      "Publish your finished game to the Unity Asset Store, Steam, or Google Play",
    ],
    curriculum: [
      {
        title: "Module 1: Unity Fundamentals & C# Basics",
        lessons: [
          { title: "Course Introduction & Unity Installation", duration: "5:10", preview: true },
          { title: "Navigating the Unity Editor", duration: "14:22", preview: true },
          { title: "C# Crash Course for Game Developers", duration: "26:40" },
          { title: "GameObjects, Components & the Scene Hierarchy", duration: "18:05" },
          { title: "Physics Engine & Rigidbody Mechanics", duration: "20:30" },
          { title: "Your First Playable 2D Character", duration: "24:15" },
        ],
      },
      {
        title: "Module 2: Building & Shipping a Complete Game",
        lessons: [
          { title: "Designing a Level with Tilemaps", duration: "22:48" },
          { title: "Enemy AI & State Machines", duration: "30:00" },
          { title: "UI, HUD & Menu Systems", duration: "19:55" },
          { title: "Audio Integration & Sound Design Basics", duration: "14:20" },
          { title: "Optimising for Mobile Platforms", duration: "21:10" },
          { title: "Publishing to Steam & Google Play", duration: "16:45" },
        ],
      },
    ],
    instructor: {
      name: "Kofi Mensah",
      title: "Indie Game Developer · Unity Certified Expert",
      avatar: "/images/instructor-kofi.png",
      bio:
        "Kofi is a Unity Certified Expert and indie game developer with 7 years of experience shipping games on Steam, iOS, and Android. His titles have collectively earned over 500,000 downloads. He is passionate about making game development accessible and has taught thousands of students to build and monetise their first game.",
      courses: 3,
      students: 8900,
      rating: 4.8,
    },
    reviews: [
      {
        name: "Oba R.",
        avatar: "/images/Oba.png",
        rating: 5,
        date: "December 2025",
        comment:
          "I had zero coding experience before this course. Now I have a working 2D platformer on itch.io with 300+ downloads. Kofi's teaching style makes complex concepts feel simple. Absolutely worth every naira.",
      },
      {
        name: "Jessica M.",
        avatar: "/images/Jessica.png",
        rating: 4,
        date: "November 2025",
        comment:
          "Great course overall. The C# section is thorough and the project-based approach kept me motivated. I'd love a deeper dive into shader graphs in a future module — but for getting started, this is unbeatable.",
      },
      {
        name: "Temi A.",
        avatar: "/images/Tiana.png",
        rating: 4,
        date: "October 2025",
        comment:
          "The enemy AI module blew my mind. I never thought I'd be able to write a state machine, but Kofi walked through it step by step. Published my first game a month after completing this — highly recommend.",
      },
    ],
    whatsIncluded: [
      "65 on-demand HD video lessons (22 hours of content)",
      "Downloadable Unity project files for every lesson",
      "2D platformer and 3D third-person complete game builds",
      "Certificate of completion to showcase on LinkedIn",
      "Lifetime access with all future Unity version updates",
    ],
  },
];

export function getCourseDetail(slug: string): CourseDetail | undefined {
  return courseDetails.find((c) => c.slug === slug);
}
