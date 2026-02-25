import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    title: "Technology and Engineering",
    description: "Explore courses on coding, web development, Software Engineering, AI, data science and more.",
    color: "#1F837A",
    image: "/images/course-categories1.png",
  },
  {
    title: "Design and Creative Direction",
    description: "UI/UX Design, Product Design, strategy, Graphic Design, Web3 graphic design, motion design and more.",
    color: " #67831F",
    
    image: "/images/course-categories2.png",
  },
  {
    title: "Marketing, Branding and Growth",
    description: "Branding, Content Strategy & Creation, Marketing strategy, SEO, and Growth Marketing.",
    color: "#591F83",

    image: "/images/course-categories3.png",
  },
  {
    title: "Business, Sales, and Community",
    description: "Sales, Community Management, Product Management, Business Strategy, Founderships and more.",
    color: "#831F21",

    image: "/images/course-categories4.png",
  },
  {
    title: "Writing, Education and Knowledge Products",
    description: "Technical Writing, Educational Content, Documentation, Knowledge Products.",
    color: "#29831F",

    image: "/images/course-categories5.png",
  },
  {
    title: "Game Development",
    description: "Game design, development, interactive media, and game monetization strategies.",
    color: "#83541F",
    

    image: "/images/course-categories6.png",
  },
];

export default function CourseCategories() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-12">
            Categories of Courses
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} direction="up" delay={i * 0.08}>
              <div
                className="rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-200 shadow-md flex flex-col items-center text-center"
                style={{ backgroundColor: cat.color }}
              >
                {/* Circular image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-4 border-white/20 flex-shrink-0">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-white text-lg leading-tight mb-2">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View More */}
        <Reveal direction="up" delay={0.2} className="text-center mt-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-8 py-3 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
          >
            View More Courses
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
