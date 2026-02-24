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
        backgroundImage: "url('/images/faq-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

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
                  <span className="font-body font-medium text-sm sm:text-base pr-4" style={{ color: "#074E1F" }}>
                    {faq.question}
                  </span>
                  <svg
                    className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#074E1F"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                  </svg>
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
