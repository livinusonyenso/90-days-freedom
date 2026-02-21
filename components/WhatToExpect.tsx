const expectItems = [
  {
    title: "Full Operational System Build",
    description: "A complete operating infrastructure built inside your business from scratch.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48">
        <rect x="8" y="8" width="32" height="32" rx="4" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
        <path d="M16 24h16M24 16v16" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="6" fill="#a5d6a7" />
      </svg>
    ),
  },
  {
    title: "Done With Your Implementation",
    description: "We work directly inside your business — not from the outside advising.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="18" r="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
        <path d="M10 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 22l4 4-4 4" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Founder Visibility Without Micromanagement.",
    description: "Full clarity on what's happening without you needing to be in every decision.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="14" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
        <path d="M10 24s4-8 14-8 14 8 14 8-4 8-14 8-14-8-14-8z" stroke="#2e7d32" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="4" fill="#2e7d32" />
      </svg>
    ),
  },
  {
    title: "Clear Execution Frameworks.",
    description: "Step-by-step systems your team can follow without needing you to explain everything.",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48">
        <rect x="14" y="8" width="20" height="6" rx="2" fill="#ffd54f" stroke="#f57f17" strokeWidth="1" />
        <rect x="18" y="18" width="12" height="6" rx="2" fill="#ffd54f" stroke="#f57f17" strokeWidth="1" />
        <rect x="22" y="28" width="4" height="6" rx="2" fill="#ffd54f" stroke="#f57f17" strokeWidth="1" />
        <path d="M24 14v4M24 24v4" stroke="#f57f17" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhatToExpect() {
  return (
    <section className="bg-brand-bg py-16 sm:py-24 border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white text-center uppercase tracking-wider mb-12">
          WHAT TO EXPECT
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {expectItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 flex items-start gap-5 shadow-card-dark hover:shadow-green-glow transition-shadow duration-300 group"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">{item.icon}</div>

              {/* Text */}
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-lg leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
