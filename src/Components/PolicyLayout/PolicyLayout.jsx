import React from "react";
import ScrollSpyNav from "../ScrollSpyNav/ScrollSpyNav";
import useScrollSpy from "../../CustomHook/useScrollSpy/useScrollSpy";

export default function PolicyLayout({
  title = "Page",
  desc,
  heading,
  lastUpdated,
  bannerImage,
  sections = [],
  sidebarTitle = "On this page",
  backToTopId = (sections[0] && sections[0].id) || "top",
}) {
  const BannerBackground = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000000d1",
    backgroundBlendMode: "color",
  };

  const activeId = useScrollSpy(sections.map((s) => s.id));

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // remove any existing hash cleanly
    if (history.replaceState) {
      const clean = window.location.pathname + window.location.search;
      history.replaceState(null, "", clean);
    }
  };

  return (
    <>
      {/* Banner */}
      <section style={BannerBackground} className="flex items-center justify-center">
        <div className="py-14 sm:py-16 lg:py-20 xl:py-22 text-center flex flex-col justify-center items-center">
          <h1 className="text-white font-Urbanist text-[33px] sm:text-[37px] lg:text-[40px] xl:text-5xl font-bold 2xl:text-[55px]">
            {title}
          </h1>
          <p className="font-Urbanist w-[85%] sm:w-[80%] text-[13.5px] sm:text-[14px] lg:text-[15px] xl:text-[17px] 2xl:text-[19px] rounded-[10px] text-[#f2f2f2] font-[500] mt-4 text-center">
            {desc}
          </p>
          {lastUpdated && (
            <span className="font-Urbanist text-[12px] lg:text-[14px] xl:text-[15px] w-max px-8 sm:px-10 2xl:text-[17px] rounded-[10px] py-2.5 sm:py-3 bg-[#ffffff27] text-[#f2f2f2] font-semibold mt-4 text-center">
              Last Update: {lastUpdated}
            </span>
          )}
        </div>
      </section>

      {/* Spacer */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFF] to-white">
        <div className="relative px-6 sm:px-10 md:px-12 lg:px-16 pt-10 pb-10 sm:pt-20 md:pt-20"></div>
      </section>

      {/* Content */}
      <section className="scroll-smooth flex justify-center">
        <div className="max-[380px]:px-6 px-7.5 sm:px-10 md:px-12 lg:px-16 pb-20 md:pb-28 2xl:w-[85%] min-[1780px]:!w-[75%]">
          <h1 className="font-Urbanist text-3xl sm:text-4xl xl:text-[39px] 2xl:text-[45px] font-extrabold tracking-tight text-[#111] mb-10">
            {heading}
          </h1>

          <div className="grid grid-cols-12 xl:grid-cols-11 2xl:grid-cols-11 gap-6 lg:gap-10">
            {/* Sidebar (TOC) */}
            <ScrollSpyNav
              sections={sections}
              activeId={activeId}
              title={sidebarTitle}
              onItemClick={scrollToId}   // <-- pass handler
            />

            {/* Main card */}
            <div className="col-span-12 2xl:col-span-8 lg:col-span-8 xl:col-span-8">
              <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="py-9 px-5 sm:p-8 md:p-10 text-[16.5px] leading-relaxed font-Inter text-gray-800">
                  {sections.map(({ id, label, content }, idx) => (
                    <section key={id} id={id} className="scroll-mt-28">
                      <h2 className="text-[21px] sm:text-[25px] font-bold font-Urbanist text-[#111] 2xl:text-[30px] leading-[25px] sm:leading-[33px]">
                        {label}
                      </h2>
                      <div className="mt-2">{content}</div>
                      {idx < sections.length - 1 && <hr className="my-8 border-gray-200" />}
                    </section>
                  ))}
                </div>
              </div>

              {/* Back to top (button, not anchor) */}
              <div className="mt-6 flex justify-end sm:hidden lg:block">
                <button
                  type="button"
                  onClick={() => scrollToId(backToTopId)}
                  className="inline-flex items-center gap-2 rounded-full hover-btn hover-btn-black border border-gray-200 px-4 py-2 text-sm 2xl:text-[19px] font-medium text-white shadow-sm hover:bg-gray-50"
                >
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
