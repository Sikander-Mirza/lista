// LongTermGrowthSection.tsx
import React from "react";

const growthPoints = [
  "Direct investor-to-investor communication",
  "Acquisition collaboration",
  "Joint venture formation",
  "Capital partnership discussions",
  "National relationship building",
];

const LongTermGrowthSection = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: Heading + intro text */}
          <div>
            <h2 className="font-Inter text-[26px] sm:text-[30px] lg:text-[35px] font-semibold  leading-tight">
              A Commercial Real Estate Network Built for Long-Term Growth
            </h2>

            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#4B5563]">
              Successful commercial real estate investing depends on alignment,
              capital access, and trusted partnerships.
            </p>

            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#4B5563]">
              Newlista strengthens investor growth by prioritizing the
              connections and conversations that matter most for commercial
              real estate investors.
            </p>
          </div>

          {/* Right: Highlight card with priorities list */}
          <div>
            <div className="rounded-2xl bg-PurpleColor px-6 py-7 sm:px-7 sm:py-8 shadow-[0_18px_45px_rgba(88,28,135,0.45)]">
              <p className="text-[13px] uppercase tracking-[0.18em] text-white/70 font-semibold mb-2">
                Growth Priorities
              </p>

              <h3 className="font-Inter text-[18px] sm:text-[20px] font-semibold text-white leading-snug">
                Newlista strengthens investor growth by prioritizing:
              </h3>

              <ul className="mt-4 space-y-3.5">
                {growthPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 text-white"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M6.44 11.72a.75.75 0 0 1-1.06 0L2.47 8.81a.75.75 0 1 1 1.06-1.06L6 10.22l6.47-6.47a.75.75 0 0 1 1.06 1.06L6.44 11.72Z"
                        />
                      </svg>
                    </span>
                    <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white/90">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-[13.5px] sm:text-[14px] leading-relaxed text-white/85">
                The platform supports the strategic relationships behind
                commercial real estate transactions, helping investors compound
                their growth over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongTermGrowthSection;