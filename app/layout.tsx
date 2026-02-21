import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "90-Days Freedom System | Build Systems. Escape Chaos. Run Without You.",
  description:
    "A structured, hands-on systemization program designed to help you turn chaotic operations into self-running execution in 90 days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="bg-brand-bg text-brand-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
