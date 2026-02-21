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
        <li key={item} className="flex items-start gap-2.5 text-brand-text-muted text-sm leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PlaceholderImage({ alt }: { alt: string }) {
  return (
    <div className="w-full aspect-[4/3] rounded-xl bg-brand-bg-card border border-brand-border flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-brand-bg-light mx-auto mb-3 flex items-center justify-center">
          <svg className="w-8 h-8 text-brand-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-brand-text-dim text-xs">{alt}</p>
      </div>
    </div>
  );
}

export default function SystemsSection() {
  return (
    <section className="bg-brand-bg py-16 sm:py-24 border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide mb-4">
            SYSTEMS + EXECUTION CREATE FREEDOM
          </h2>
          <p className="text-brand-text-muted text-base">
            Founders struggle when everything depends on them and nothing moves without their involvement.
          </p>
        </div>

        {/* Block 1: Image Left + Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <PlaceholderImage alt="Founder working" />
          <div>
            <p className="text-white font-heading font-semibold text-xl leading-snug mb-6">
              We help founders build self running operations that scale without chaos:
            </p>
            <BulletList items={chaosPoints} />
          </div>
        </div>

        {/* Block 2: Image Left + Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <PlaceholderImage alt="Operational support" />
          <div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-4">
              OPERATIONAL SUPPORT
            </h3>
            <p className="text-brand-text-muted text-sm leading-relaxed mb-5">
              Work directly inside your business to install systems that actually run.
              This is not advice from the outside. It is hands on implementation, clarity, and accountability.
            </p>
            <BulletList items={operationalPoints} />
          </div>
        </div>

        {/* Block 3: Image Left + Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <PlaceholderImage alt="Day one team collaboration" />
          <div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-4">
              WHAT YOU GET FROM DAY ONE
            </h3>
            <p className="text-brand-text-muted text-sm leading-relaxed mb-5">
              From the first day, you are guided through a clear starting point so you know exactly what to focus on,
              what to ignore, and how to move forward with intention.
            </p>
            <BulletList items={dayOnePoints} />
          </div>
        </div>

      </div>
    </section>
  );
}
