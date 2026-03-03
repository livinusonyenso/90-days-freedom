export type JobType = "Remote" | "Hybrid" | "Onsite";
export type JobCategory =
  | "Design"
  | "Engineering"
  | "Marketing"
  | "Sales"
  | "Content"
  | "Operations";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: JobCategory;
  salary: string;
  postedDays: number;
  shortDesc: string;
  fullDesc: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  companyDesc: string;
}

export const jobs: Job[] = [
  {
    id: "senior-ui-ux-designer",
    title: "Senior UI/UX Designer",
    company: "90-Days Freedom",
    location: "Remote — Worldwide",
    type: "Remote",
    category: "Design",
    salary: "$80,000 – $120,000 / yr",
    postedDays: 2,
    shortDesc:
      "Design intuitive, high-converting interfaces for our learning platform and client-facing products.",
    fullDesc:
      "We're looking for a Senior UI/UX Designer who thrives at the intersection of aesthetics and function. You'll own end-to-end design for the 90-Days Freedom System platform — from wireframes to polished, production-ready components — working closely with engineering and product teams to ship experiences users love.",
    responsibilities: [
      "Lead end-to-end product design for web and mobile experiences",
      "Conduct user research, usability tests, and synthesize findings into actionable insights",
      "Create wireframes, interactive prototypes, and high-fidelity mockups in Figma",
      "Build and maintain a scalable, consistent design system",
      "Collaborate with engineers to ensure pixel-perfect implementation",
      "Present design decisions to stakeholders and iterate based on feedback",
    ],
    requirements: [
      "5+ years of product design experience (B2C or SaaS preferred)",
      "Expert-level proficiency in Figma",
      "Strong portfolio showcasing end-to-end design work",
      "Solid understanding of accessibility standards (WCAG 2.1)",
      "Experience working in agile, cross-functional teams",
      "Excellent written and verbal communication skills",
    ],
    niceToHave: [
      "Experience designing educational or e-learning products",
      "Familiarity with motion design / Framer",
      "Basic front-end knowledge (HTML/CSS/React)",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer (React / Next.js)",
    company: "90-Days Freedom",
    location: "Remote — US/EU",
    type: "Remote",
    category: "Engineering",
    salary: "$90,000 – $140,000 / yr",
    postedDays: 4,
    shortDesc:
      "Build fast, accessible, pixel-perfect interfaces using Next.js 15, TypeScript, and Tailwind CSS.",
    fullDesc:
      "Join our lean engineering team to build the frontend infrastructure behind a growing edtech product. You'll work directly with design and product to ship features quickly without sacrificing quality — writing clean TypeScript, optimizing Core Web Vitals, and crafting smooth animations that delight users.",
    responsibilities: [
      "Develop new product features using Next.js (App Router), TypeScript, and Tailwind CSS",
      "Collaborate with designers to implement precise, responsive UIs",
      "Optimize pages for performance, SEO, and Core Web Vitals",
      "Write unit and integration tests for critical components",
      "Maintain and extend the frontend design system",
      "Review pull requests and mentor junior developers",
    ],
    requirements: [
      "3+ years of frontend development experience",
      "Strong proficiency in React and Next.js (App Router)",
      "TypeScript experience in production codebases",
      "Familiarity with REST APIs and JWT-based auth",
      "Understanding of responsive design and cross-browser compatibility",
      "Experience with Git, CI/CD pipelines, and code review workflows",
    ],
    niceToHave: [
      "Experience with Framer Motion or GSAP for animations",
      "Contributions to open-source projects",
      "Knowledge of Node.js / Express",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "backend-developer",
    title: "Backend Developer (Node.js)",
    company: "90-Days Freedom",
    location: "Remote — Worldwide",
    type: "Remote",
    category: "Engineering",
    salary: "$85,000 – $130,000 / yr",
    postedDays: 6,
    shortDesc:
      "Design and maintain robust REST APIs, authentication systems, and database architecture.",
    fullDesc:
      "We need a Backend Developer to own our server infrastructure — building reliable APIs, securing user data, and ensuring the platform scales smoothly as we grow. You'll work in a Node.js / Express / MySQL stack with a focus on clean architecture, solid error handling, and maintainability.",
    responsibilities: [
      "Build and maintain RESTful APIs using Node.js and Express",
      "Design and optimize MySQL database schemas and queries",
      "Implement authentication, authorization, and security best practices",
      "Integrate third-party services (email, payments, analytics)",
      "Write unit and integration tests with high coverage",
      "Monitor API performance and resolve production issues",
    ],
    requirements: [
      "3+ years of backend development with Node.js",
      "Strong SQL skills (MySQL or PostgreSQL)",
      "Experience with JWT-based authentication and RBAC",
      "Knowledge of REST API design principles",
      "Familiarity with nodemailer or similar email services",
      "Experience with environment configuration and deployment (VPS / cloud)",
    ],
    niceToHave: [
      "Experience with Redis for caching / rate limiting",
      "Knowledge of Docker and containerization",
      "AWS or DigitalOcean deployment experience",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "marketing-manager",
    title: "Digital Marketing Manager",
    company: "90-Days Freedom",
    location: "Lagos, Nigeria",
    type: "Hybrid",
    category: "Marketing",
    salary: "$50,000 – $75,000 / yr",
    postedDays: 5,
    shortDesc:
      "Lead digital campaigns across paid social, email, and SEO to drive course enrollments and brand awareness.",
    fullDesc:
      "We're looking for a data-driven Digital Marketing Manager to own our growth channels. You'll develop and execute full-funnel campaigns, manage ad budgets, and analyze performance to continually optimize our CAC and LTV — ultimately driving a steady stream of qualified leads into our course funnels.",
    responsibilities: [
      "Plan and execute multi-channel digital marketing campaigns (Meta, Google, Email)",
      "Own monthly content calendar across social media and blog",
      "Set up, manage, and optimize paid advertising campaigns",
      "Monitor KPIs (ROAS, CAC, CTR, conversion rates) and report to leadership",
      "Work with content and design teams to produce high-converting creatives",
      "Manage email marketing sequences and automated nurture flows",
    ],
    requirements: [
      "4+ years of digital marketing experience",
      "Proven experience running profitable paid social / search campaigns",
      "Proficiency with Meta Ads Manager, Google Ads, and email platforms",
      "Strong analytical skills — comfortable in Google Analytics, Data Studio",
      "Excellent written and verbal communication",
      "Experience marketing B2C or online education products",
    ],
    niceToHave: [
      "Experience with funnel builders (ClickFunnels, Kartra, GoHighLevel)",
      "SEO/content marketing background",
      "Video ad creative experience",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "content-strategist",
    title: "Content Strategist & Writer",
    company: "90-Days Freedom",
    location: "Remote — Worldwide",
    type: "Remote",
    category: "Content",
    salary: "$45,000 – $70,000 / yr",
    postedDays: 7,
    shortDesc:
      "Craft compelling blog posts, course copy, and email sequences that educate, engage, and convert.",
    fullDesc:
      "We need a sharp Content Strategist to develop and execute our editorial strategy. You'll produce high-quality written content — from SEO blog posts and course landing pages to email sequences and social copy — ensuring every word serves a clear purpose and drives measurable results.",
    responsibilities: [
      "Develop and maintain a data-driven content strategy and editorial calendar",
      "Write SEO-optimized blog posts, guides, and landing page copy",
      "Collaborate with course instructors to create compelling course descriptions",
      "Write email marketing sequences (welcome series, launches, re-engagement)",
      "Track content performance using Google Analytics and Search Console",
      "Repurpose long-form content into social posts, threads, and newsletter snippets",
    ],
    requirements: [
      "3+ years of content writing / content strategy experience",
      "Portfolio of published long-form content (blog posts, case studies)",
      "Strong SEO fundamentals and keyword research skills",
      "Experience writing email marketing copy",
      "Ability to write in a clear, direct, persuasive voice",
      "Excellent editing and proofreading skills",
    ],
    niceToHave: [
      "Experience in the edtech, business, or self-improvement niche",
      "Familiarity with ConvertKit, Klaviyo, or similar ESPs",
      "Basic knowledge of on-page SEO tools (Ahrefs, SEMrush)",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "sales-executive",
    title: "Sales Executive",
    company: "90-Days Freedom",
    location: "Abuja, Nigeria",
    type: "Onsite",
    category: "Sales",
    salary: "$35,000 – $60,000 + commission",
    postedDays: 3,
    shortDesc:
      "Close high-ticket enrollments and build lasting relationships with prospective students and business clients.",
    fullDesc:
      "We're looking for a driven Sales Executive to join our team in Abuja. You'll engage warm leads generated through our marketing funnels, conduct discovery calls, present our program offerings, and close enrollments. This role is perfect for someone who is consultative, persuasive, and genuinely passionate about helping people build better businesses.",
    responsibilities: [
      "Engage and qualify inbound leads through calls, emails, and DMs",
      "Conduct discovery and demo calls to understand prospect needs",
      "Present the 90-Days Freedom program and address objections effectively",
      "Follow up with leads through structured CRM-based cadences",
      "Meet and exceed monthly enrollment revenue targets",
      "Collaborate with marketing to provide feedback on lead quality",
    ],
    requirements: [
      "2+ years of sales experience (B2C, high-ticket, or education sales preferred)",
      "Strong communication and active listening skills",
      "Experience with CRM tools (HubSpot, GoHighLevel, or similar)",
      "Comfortable on video and phone calls",
      "Highly organized with strong follow-through",
      "Self-motivated, target-driven mindset",
    ],
    niceToHave: [
      "Experience selling online courses or coaching programs",
      "Familiarity with sales frameworks (SPIN, Sandler, NEPQ)",
      "Basic understanding of digital marketing funnels",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "video-editor",
    title: "Video Editor",
    company: "90-Days Freedom",
    location: "Remote — Worldwide",
    type: "Remote",
    category: "Content",
    salary: "$40,000 – $65,000 / yr",
    postedDays: 9,
    shortDesc:
      "Edit high-quality course videos, short-form social content, and promotional reels that look and feel premium.",
    fullDesc:
      "We're looking for a creative Video Editor who can take raw footage and turn it into polished, engaging content. You'll edit course modules, YouTube long-form videos, and short-form clips for Instagram and TikTok — maintaining a consistent visual identity and ensuring every cut serves the viewer's attention.",
    responsibilities: [
      "Edit course modules and instructional videos with clean cuts, lower thirds, and captions",
      "Create short-form social videos (Reels, TikTok, YouTube Shorts) from long-form content",
      "Add motion graphics, transitions, and on-brand visual effects",
      "Color grade footage and mix audio to broadcast-ready standards",
      "Manage an organized file and asset library",
      "Work with the content team to deliver edits within tight deadlines",
    ],
    requirements: [
      "2+ years of professional video editing experience",
      "Proficiency in Adobe Premiere Pro or Final Cut Pro",
      "Portfolio of edited video work (courses, YouTube, or branded content)",
      "Understanding of pacing, storytelling, and visual hierarchy",
      "Experience adding captions and motion graphics",
      "Ability to manage multiple projects simultaneously",
    ],
    niceToHave: [
      "Experience with After Effects for motion graphics",
      "Knowledge of YouTube SEO and thumbnail design",
      "Experience editing e-learning or educational content",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
  {
    id: "operations-manager",
    title: "Operations Manager",
    company: "90-Days Freedom",
    location: "Lagos, Nigeria",
    type: "Hybrid",
    category: "Operations",
    salary: "$55,000 – $80,000 / yr",
    postedDays: 11,
    shortDesc:
      "Systematize and streamline business operations to help the team run efficiently at scale.",
    fullDesc:
      "We need a detail-oriented Operations Manager to build and maintain the systems that allow our business to run smoothly. You'll document SOPs, manage cross-functional projects, oversee vendor relationships, and ensure every department is aligned and executing effectively.",
    responsibilities: [
      "Design, document, and implement standard operating procedures (SOPs)",
      "Manage and track cross-functional projects using project management tools",
      "Identify operational bottlenecks and implement process improvements",
      "Coordinate between departments to ensure smooth information flow",
      "Oversee vendor relationships and tool/subscription management",
      "Prepare weekly operational reports for leadership",
    ],
    requirements: [
      "3+ years of operations or project management experience",
      "Experience building and documenting SOPs and workflows",
      "Proficiency with project management tools (Notion, Asana, Monday.com)",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management abilities",
      "Highly organized with strong attention to detail",
    ],
    niceToHave: [
      "PMP or equivalent project management certification",
      "Experience in a digital business or online education company",
      "Familiarity with automation tools (Zapier, Make)",
    ],
    companyDesc:
      "90-Days Freedom System is a fast-growing edtech platform helping entrepreneurs build self-running businesses in 90 days through expert-led courses, community, and coaching.",
  },
];

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}

export const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  Remote: { bg: "#f0fdf4", color: "#15803d" },
  Hybrid: { bg: "#eff6ff", color: "#2563eb" },
  Onsite: { bg: "#fff7ed", color: "#ea580c" },
};

export const CATEGORY_ICONS: Record<string, string> = {
  Design: "🎨",
  Engineering: "⚙️",
  Marketing: "📣",
  Sales: "💼",
  Content: "✍️",
  Operations: "🗂️",
};
