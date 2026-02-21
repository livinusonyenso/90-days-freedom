import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="bg-brand-bg py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div>
            <Link
              href="#about"
              className="inline-flex items-center gap-3 border-2 border-brand-green text-brand-green font-heading font-bold text-lg tracking-widest px-10 py-4 rounded hover:bg-brand-green hover:text-brand-bg transition-all duration-300 group mb-8"
            >
              HOW THE SYSTEM WORKS
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white uppercase mb-6 tracking-wide">
              THE 90-DAY FREEDOM SYSTEM
            </h2>

            <p className="text-brand-text-muted text-base leading-relaxed mb-5">
              Most people are not stuck because they lack effort or intelligence.
              They are stuck because their business depends on them for everything.
            </p>

            <p className="text-brand-text-muted text-base leading-relaxed">
              The 90 Day Freedom System™ is built to fix that. This is a
              structured, hands-on systemization program designed to help you turn
              chaotic operations into self-running execution in 90 days, using
              practical workflows, SOPs, dashboards, and automation that fit the
              reality of how you actually operate.
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full rounded-xl overflow-hidden border border-brand-border shadow-green-glow">
            <Image
              src="/images/contactus.png"
              alt="90-Day Freedom System devices preview"
              width={600}
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="w-full h-auto object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
