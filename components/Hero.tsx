import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="features"
      className="relative pt-[62px] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#063114" }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 matrix-bg pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-14 sm:pt-20 pb-0">
      

        {/* Headline */}
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
          THE 90-DAY FREEDOM SYSTEM
        </h1>

        {/* Subheadline */}
        <p className="text-brand-text-muted text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed mb-10">
          Build a business that runs without you being in the middle of{" "}
          <br className="hidden sm:block" />
          everything.
        </p>

        {/* Hero Banner Image */}
        <div className="w-full rounded-xl overflow-hidden border border-brand-border shadow-green-glow mb-10">
          <div className="relative w-full aspect-[1200/380]">
            <Image
              src="/images/hero.png"
              alt="The 90-Day Freedom System"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

     
      </div>
    </section>
  );
}
