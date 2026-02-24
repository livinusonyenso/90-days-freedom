import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-10 sm:py-20 text-center"
      style={{ backgroundColor: "#074E1F" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Badge */}
        <div className="mb-10">
          <Link
            href="#about"
            className="inline-flex items-center justify-center bg-brand-green text-white font-heading font-bold text-sm sm:text-base tracking-widest px-10 py-4 rounded-lg hover:opacity-90 transition-all duration-300"
          >
            HOW THE SYSTEM WORKS
          </Link>
        </div>

        {/* Main Title */}
        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide mb-8">
          THE 90-DAY FREEDOM SYSTEM
        </h2>

        {/* Description */}
        <div className="space-y-6 max-w-3xl mx-auto mb-16">
          <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed">
            Most people are not stuck because they lack effort or intelligence.
            They are stuck because their business depends on them for everything.
          </p>

          <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed">
            The 90 Day Freedom System™ is built to fix that. This is a structured,
            hands-on systemization program designed to help you turn chaotic
            operations into self-running execution in 90 days, using practical
            workflows, SOPs, dashboards, and automation that fit the reality of
            how you actually operate.
          </p>
        </div>

        {/* Image */}
        <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden ">
          <Image
            src="/images/contactus.png"
            alt="The 90-Day Freedom System preview"
            width={1200}
            height={700}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="w-full h-auto object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}