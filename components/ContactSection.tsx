"use client";

import { useState } from "react";
import Link from "next/link";

const subjects = ["General Inquiry", "Technical Support", "Billing", "Partnership"];

export default function ContactSection() {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Contact Us */}
      <section id="contact" className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-500 text-base">
              Any question or remarks? Just write us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-card-dark border border-gray-200">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 bg-brand-bg-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-white text-xl mb-2">
                  Contact Information
                </h3>
                <p className="text-brand-text-muted text-sm mb-8">
                  Say something to start a live chat!
                </p>

                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-white text-sm">+1012 3456 789</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white text-sm">demo@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-white text-sm leading-relaxed">
                      132 Dartmouth Street Boston,<br />
                      Massachusetts 02156 United States
                    </span>
                  </li>
                </ul>
              </div>

              {/* Decorative circle */}
              <div className="relative mt-10">
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-brand-bg-light opacity-50" />
                <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-brand-border opacity-60" />
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex items-center gap-2 text-brand-text-muted hover:text-white text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter X
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 bg-white p-8">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-900 font-heading font-bold text-xl">Message Sent!</p>
                    <p className="text-gray-500 text-sm mt-1">We&apos;ll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-600 text-xs font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-xs font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-600 text-xs font-medium mb-1">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-xs font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 012 3456 789"
                        className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Subject radio */}
                  <div>
                    <label className="block text-gray-600 text-xs font-medium mb-3">Select Subject?</label>
                    <div className="flex flex-wrap gap-4">
                      {subjects.map((s, i) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="subject"
                            checked={selectedSubject === i}
                            onChange={() => setSelectedSubject(i)}
                            className="w-3.5 h-3.5 accent-green-700"
                          />
                          <span className="text-sm text-gray-700">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-600 text-xs font-medium mb-1">Message</label>
                    <textarea
                      required
                      placeholder="Write your message..."
                      rows={4}
                      className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors bg-transparent resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-brand-bg-card text-white font-heading font-bold text-sm tracking-wider px-8 py-3 rounded-lg hover:bg-brand-bg-light transition-colors duration-200"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started CTA */}
      <section className="relative bg-brand-bg-card overflow-hidden py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white leading-tight mb-6">
                Ready to get started?
              </h2>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-heading font-bold text-sm tracking-widest px-8 py-3.5 rounded-full hover:bg-white hover:text-brand-bg transition-all duration-200"
              >
                KICKSTART YOUR FUTURE
              </Link>
            </div>

            {/* Decorative mockup circle */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-brand-bg-light border border-brand-border flex items-center justify-center shadow-green-glow overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-brand-green/20 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-heading font-bold text-white text-sm">Your Systems</p>
                  <p className="text-brand-text-muted text-xs">Running Without You</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
