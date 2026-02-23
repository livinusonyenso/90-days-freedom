import Image from "next/image";

const expectItems = [
  { title: "Full Operational System Build", image: "/images/what-to-expect1.png" },
  { title: "Done With Your Implementation", image: "/images/what-to-expect2.png" },
  { title: "Founder Visibility Without Micromanagement.", image: "/images/what-to-expect3.png" },
  { title: "Clear Execution Frameworks.", image: "/images/what-to-expect4.png" },
];

export default function WhatToExpect() {
  return (
    <section className="py-16 sm:py-24 border-t border-brand-border" style={{ backgroundColor: "#074E1F" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white text-center uppercase tracking-wider mb-12">
          WHAT TO EXPECT
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {expectItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl overflow-hidden shadow-card-dark hover:shadow-green-glow transition-shadow duration-300"
            >
              {/* Title */}
              <div className="px-6 pt-5 pb-3 text-center">
                <h3 className="font-heading font-bold text-gray-900 text-lg leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
