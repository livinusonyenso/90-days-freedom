"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Who is the 90-Day Freedom System for?",
    answer:
      "The 90-Day Freedom System is designed for founders and business owners who are stuck in daily operations and want to build self-running systems. If your business depends on you for everything and you want to change that within 90 days, this program is for you.",
  },
  {
    question: "How do I Access the Discord Chat?",
    answer:
      "Once you purchase either the Discord Access or Autonomy Layer plan, you will receive an email with instructions to join our private community Discord server. Access is granted within 24 hours of payment confirmation.",
  },
  {
    question: "What If I Want To Cancel?",
    answer:
      "We offer a 30-day money-back guarantee on all plans. If you're not satisfied within the first 30 days, simply reach out to our support team and we'll process a full refund — no questions asked.",
  },
  {
    question: "Do You Offer 1:1 Coaching?",
    answer:
      "The Autonomy Layer plan includes quarterly private system strategy sessions for personalized 1:1 guidance. The Discord Access plan includes group coaching through our weekly office hours every Sunday from 9am–11am EST.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050f05 0%, #071a07 50%, #050f05 100%)",
      }}
    >
      {/* Decorative wave/smoke background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(0,230,118,0.15) 0%, transparent 50%),
                              radial-gradient(ellipse at 80% 30%, rgba(0,191,165,0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-wider text-center mb-12">
          FIND ANSWERS TO COMMON QUESTIONS
        </h2>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl overflow-hidden"
                style={{ background: "rgba(240,248,240,0.95)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-body font-medium text-gray-900 text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-brand-green" : ""
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-brand-green" : "text-gray-600"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className="accordion-content"
                  style={{ maxHeight: isOpen ? "300px" : "0" }}
                >
                  <p className="px-6 pb-5 text-gray-700 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
