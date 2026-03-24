import React from "react";
import { Link } from "react-router-dom";
import HomeSec1_1 from "../../../assets/Illustration/HomeSec1.1.webp";
import HomeSec1_2 from "../../../assets/Illustration/HomeSec1.2.webp";
import HomeSec1_3 from "../../../assets/Illustration/HomeSec1.3.webp";

const CardShowcase = ({ token, onclick, NetWorkView }) => {

  const CardDetails = [
{
  image: HomeSec1_1,
  name: "Built Exclusively for Commercial Real Estate Investment",
  desc: `Newlista is dedicated solely to commercial real estate. 
  
  The network supports investors active in:

• Multifamily
• Retail
• Industrial
• Office
• Mixed-use
• Land and development projects

Every connection, conversation, and opportunity inside the platform is centered around commercial property investment.

By maintaining a clear commercial real estate focus, the platform creates alignment between members who share similar investment objectives and deal structures.`,
  buttonName: "Add a Property",
  ButtonLink: `${token ? '/create-property' : "/login"} `,
},
    {
      image: HomeSec1_2,
      name: "More Than Listings, Investor-to-Investor Collaboration",
      desc: `While members can share commercial investment opportunities, Newlista is structured primarily as a relationship-driven investor network.

      Inside the platform, investors can:

      ●	Connect directly with other commercial real estate investors
●	Form acquisition partnerships
●	Structure joint ventures
●	Discuss equity participation opportunities
●	Expand into new markets through strategic relationships
●	Strengthen deal flow through trusted investor connections

The emphasis is not just on property search, it is on building the investor relationships that drive commercial acquisitions forward.`,
      buttonName: "Create a Network",
      onclick: NetWorkView,
    },
    {
      image: HomeSec1_3,
      name: "Designed for Active Commercial Real Estate Investors",
      desc: `Newlista is built specifically for:
      
      ●	Independent commercial real estate investors
●	Acquisition-focused investors
●	Syndicators
●	Equity partners
●	Investors seeking long-term commercial partnerships

The platform is not intended for brokers, residential agents, wholesalers, or service marketers.

It is a commercial real estate investor ecosystem designed to facilitate investor collaboration.`,
      buttonName: "Find Off Market Properties",
      onclick: onclick,
    },
  ];

  return (
    <>
      <section className="flex flex-col sm:items-center justify-center gap-8 px-6 sm:px-0 py-20 sm:py-14 sm:gap-10 w-[100%] xl:w-[97%] 2xl:w-[80%] 2xl:py-20">
        <div className="flex flex-col justify-center items-center sm:w-[80%] md:w-[80%] lg:w-[69%] xl:w-[63%] sm:text-center">
  <h2 className="text-[32px] leading-[38px] font-[700] font-Urbanist text-[#1E1E1E] sm:text-[33px] sm:leading-[40px] md:text-[33px] xl:text-[40px] md:leading-[40px] min-[1780px]:!text-[45px]">
    Where Commercial Real Estate Investors Build Partnerships
  </h2>
  
  <p className="text-[14px] font-Inter font-medium text-pretty text-Paracolor mt-7 sm:text-[13.5px] md:text-[13.5px] xl:text-[15px] min-[1780px]:!text-[16.5px] text-left w-full">
    Newlista is an investor-focused commercial real estate networking platform designed exclusively for active commercial real estate investors.
  </p>
  
  <p className="text-[14px] font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[13.5px] md:text-[13.5px] xl:text-[15px] min-[1780px]:!text-[16.5px] text-left w-full">
    The platform connects investors with other investors to build relationships, form joint ventures, strengthen acquisition pipelines, and share commercial investment opportunities within a focused investor community.
  </p>
  
  <p className="text-[14px] font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[13.5px] md:text-[13.5px] xl:text-[15px] min-[1780px]:!text-[16.5px] text-left w-full">
    Newlista is not a brokerage, not a public listing portal, and not a service marketplace. It is a commercial real estate investor network built around collaboration and long-term partnerships.
  </p>
</div>
       <div className="
  grid
  grid-cols-1
  sm:grid-cols-3
  min-[890px]:grid-cols-3
  gap-8 sm:gap-4
  sm:w-[90%] md:w-[84%] min-[870px]:!w-[92%] md:gap-3 lg:!w-[82%]
">
  {CardDetails.map((items, index) => {
    return (
      <div
        key={index}
        className="bg-PurpleColor rounded-[10px] px-5.5 py-8 flex flex-col gap-4"
      >
        <div>
          <img className="sm:w-[28%]"    width={80}
  height={80} src={items.image} alt="Newlista" />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-textColor font-Inter font-semibold text-[23px] sm:text-[20px] min-[890px]:!text-[19px] min-[1080px]:!text-[20px] min-[1280px]:!text-[22px] leading-[26px] min-[1780px]:!text-[27px] min-[1780px]:!leading-[33px]">
            {items.name}
          </h2>
          <p className="whitespace-pre-line text-textColor font-Inter text-[15px] sm:text-[15px] min-[890px]:!text-[13.5px] min-[1080px]:!text-[15px] min-[1280px]:!text-[15.5px] min-[1780px]:!text-[17px]">
            {items.desc}
          </p>
        </div>

        {/* button block (if you re-enable it) */}
        {/* <div className="mt-auto pt-3">
          ...
        </div> */}
      </div>
    );
  })}
</div>
      </section>
    </>
  );
};

export default CardShowcase;
