import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center">
              <span className="text-brand-bg font-heading font-bold text-xs leading-none">
                90
              </span>
            </div>
            <span className="text-brand-text-dim text-xs">Days</span>
          </Link>

          {/* Copyright */}
          <p className="text-brand-text-dim text-xs text-center">
            © 2026 Coded_Lang. All Rights Reserved.
          </p>

          {/* Social */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-text-dim hover:text-white text-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter X
          </a>
        </div>
      </div>
    </footer>
  );
}
