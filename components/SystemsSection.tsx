import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const chaosPoints = [
  "Design clear workflows that remove decision fatigue",
  "Build dashboards that show what matters, not noise",
  "Eliminate bottlenecks slowing down execution",
  "Create accountability without micromanagement",
  "Standardize how work flows across teams",
  "Reduce operational fires and last minute emergencies",
  "Stop being the default problem solver in your business",
];

const operationalPoints = [
  "Structured 90 day system build out",
  "Done with you execution and refinement",
  "Operational reviews and system optimization",
  "Practical tools your team actually uses",
  "Founder level visibility without daily involvement",
];

const dayOnePoints = [
  "Guided onboarding and system orientation",
  "A clear execution roadmap for the next 90 days",
  "Core workflow frameworks to organize how work gets done",
  "SOP templates to turn tasks into repeatable systems",
  "Operational checklists to prevent missed steps and errors",
  "Dashboards for tracking progress and performance",
  "Access to system updates, improvements, and refinements",
  "Structured reviews to keep you aligned and consistent",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-white text-sm leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SystemsSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-brand-border" style={{ backgroundColor: "#063114" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">

        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide mb-4">
            SYSTEMS + EXECUTION CREATE FREEDOM
          </h2>
          <p className="text-white text-base">
            Founders struggle when everything depends on them and nothing moves without their involvement.
          </p>
        </Reveal>

        {/* Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal direction="right">
            <div className="w-full rounded-xl overflow-hidden border border-brand-border shadow-green-glow">
              <Image
                src="/images/systems-execution-create-freedom1.png"
                alt="Founder working"
                width={600}
                height={450}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
          <RevealGroup delay={0.1}>
            <RevealItem direction="up">
              <p className="text-white font-heading font-semibold text-xl leading-snug mb-6">
                We help founders build self running operations that scale without chaos:
              </p>
            </RevealItem>
            <RevealItem direction="up">
              <BulletList items={chaosPoints} />
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal direction="right">
            <div className="w-full rounded-xl overflow-hidden border border-brand-border shadow-green-glow">
              <Image
                src="/images/systems-execution-create-freedom2.png"
                alt="Operational support"
                width={600}
                height={450}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
          <RevealGroup delay={0.1}>
            <RevealItem direction="up">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-4">
                OPERATIONAL SUPPORT
              </h3>
            </RevealItem>
            <RevealItem direction="up">
              <p className="text-white text-sm leading-relaxed mb-5">
                Work directly inside your business to install systems that actually run.
                This is not advice from the outside. It is hands on implementation, clarity, and accountability.
              </p>
            </RevealItem>
            <RevealItem direction="up">
              <BulletList items={operationalPoints} />
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Block 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal direction="right">
            <div className="w-full rounded-xl overflow-hidden border border-brand-border shadow-green-glow">
              <Image
                src="/images/systems-execution-create-freedom3.png"
                alt="Day one team collaboration"
                width={600}
                height={450}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
          <RevealGroup delay={0.1}>
            <RevealItem direction="up">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-4">
                WHAT YOU GET FROM DAY ONE
              </h3>
            </RevealItem>
            <RevealItem direction="up">
              <p className="text-white text-sm leading-relaxed mb-5">
                From the first day, you are guided through a clear starting point so you know exactly what to focus on,
                what to ignore, and how to move forward with intention.
              </p>
            </RevealItem>
            <RevealItem direction="up">
              <BulletList items={dayOnePoints} />
            </RevealItem>
          </RevealGroup>
        </div>

      </div>
    </section>
  );
}
