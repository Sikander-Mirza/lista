// HowInvestorNetworkWorks.tsx
import React from "react";

const steps = [
  {
    title: "Join the Network",
    description:
      "Create your investor profile and connect with other commercial real estate investors across multiple markets.",
  },
  {
    title: "Build Strategic Relationships",
    description:
      "Engage in discussions, explore acquisition partnerships, and collaborate on commercial investment opportunities.",
  },
  {
    title: "Share and Discover Opportunities",
    description:
      "Members can share investment opportunities within the network and connect with aligned investors interested in similar asset classes.",
  },
  {
    title: "Conduct Independent Due Diligence",
    description:
      "Newlista provides the infrastructure for investor networking. Members are responsible for evaluating opportunities and investment partners before entering into agreements.",
  },
];

const HowInvestorNetworkWorks = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-Inter text-[26px] sm:text-[32px] lg:text-[36px] font-semibold  leading-tight">
            How the Investor Network Works
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] text-[#6B7280]">
            Understand how commercial real estate investors join the network,
            build meaningful relationships, share opportunities, and conduct
            their own due diligence inside Newlista.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex h-full flex-col rounded-2xl bg-PurpleColor px-5 py-6 sm:px-6 sm:py-7 shadow-[0_18px_40px_rgba(88,28,135,0.35)]"
            >
              {/* Step pill */}
              <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white uppercase tracking-[0.16em] mb-3">
                Step {index + 1}
              </span>

              {/* Title */}
              <h3 className="font-Inter text-[17px] sm:text-[18px] font-semibold text-white leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-white/90">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowInvestorNetworkWorks;