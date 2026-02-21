const categories = [
  {
    title: "Technology and Engineering",
    description:
      "Explore courses on coding, web development, Software Engineering, AI, data science and more.",
    color: "#0d3b2e",
    accentColor: "#00e676",
    emoji: "💻",
  },
  {
    title: "Design and Creative Direction",
    description:
      "UI/UX Design, Product Design, strategy, Graphic Design, Web3 graphic design, motion design and more.",
    color: "#2d3b0d",
    accentColor: "#c6e600",
    emoji: "🎨",
  },
  {
    title: "Marketing, Branding and Growth",
    description:
      "Branding, Content Strategy & Creation, Marketing strategy, SEO, and Growth Marketing.",
    color: "#2d0d3b",
    accentColor: "#b300e6",
    emoji: "📈",
  },
  {
    title: "Business, Sales, and Community",
    description:
      "Sales, Community Management, Product Management, Business Strategy, Foundrships and more.",
    color: "#3b0d0d",
    accentColor: "#e63300",
    emoji: "💼",
  },
  {
    title: "Writing, Education and Knowledge Products",
    description:
      "Technical Writing, Educational Content, Documentation, Knowledge Products.",
    color: "#0d3b1a",
    accentColor: "#00e65c",
    emoji: "✍️",
  },
  {
    title: "Game Development",
    description:
      "Game design, development, interactive media, and game monetization strategies.",
    color: "#2e2000",
    accentColor: "#e6a000",
    emoji: "🎮",
  },
];

export default function CourseCategories() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-12">
          Categories of Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-200 shadow-md"
              style={{ backgroundColor: cat.color }}
            >
              {/* Emoji icon */}
              <div className="text-4xl mb-4">{cat.emoji}</div>

              <h3
                className="font-heading font-bold text-white text-lg leading-tight mb-2"
                style={{ textShadow: `0 0 20px ${cat.accentColor}40` }}
              >
                {cat.title}
              </h3>

              <p className="text-white/70 text-sm leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
