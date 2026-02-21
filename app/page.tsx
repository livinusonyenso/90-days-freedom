import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhatToExpect from "@/components/WhatToExpect";
import CourseCategories from "@/components/CourseCategories";
import SystemsSection from "@/components/SystemsSection";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <WhatToExpect />
        <CourseCategories />
        <SystemsSection />
        <Pricing />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
